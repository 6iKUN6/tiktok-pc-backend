import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'src/common/redis/redis.service';
@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, // JWT服务，用于验证和解析JWT token
    private configService: ConfigService, // 配置服务，用于获取JWT_SECRET
    private reflector: Reflector,
    private cacheService: CacheService, //redis
  ) {}

  /**
   * 判断请求是否通过身份验证
   * @param context 执行上下文
   * @returns 是否通过身份验证
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 看看接口有没有Public放行注解，有就不用走token检验
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      //即将调用的方法
      context.getHandler(),
      //controller类型
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest(); // 获取请求对象
    const token = this.extractTokenFromHeader(request); // 从请求头中提取token
    if (!token) {
      throw new HttpException('验证不通过', HttpStatus.FORBIDDEN); // 如果没有token，抛出验证不通过异常
    }

    const realToken = await this.cacheService.get(token);
    try {
      const payload = await this.jwtService.verifyAsync(realToken, {
        secret: this.configService.get('JWT_SECRET'), // 使用JWT_SECRET解析token
      });
      //获取token过期时间
      const { exp } = payload;
      // console.log('payload', payload, payload.exp);
      const nowTime = Math.floor(new Date().getTime() / 1000);
      const isExpired = exp - nowTime < 30; // 判断token是否过期
      // console.log(isExpired, exp - nowTime);

      if (isExpired) {
        const newPayLoad = { username: payload.username, sub: payload.sub }; //{username,id}
        const newToken = await this.jwtService.signAsync(newPayLoad);
        this.cacheService.set(token, newToken, 7200);
      }
      request['user'] = payload; // 将解析后的用户信息存储在请求对象中
    } catch (error) {
      // console.log('error', error);
      throw new HttpException('token验证失败', HttpStatus.FORBIDDEN); // token验证失败，抛出异常
    }

    return true; // 身份验证通过
  }

  /**
   * 从请求头中提取token
   * @param request 请求对象
   * @returns 提取到的token
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    // 要在前面加上Bearer后面接一个空字符;
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // 从Authorization头中提取token
    return type === 'Bearer' ? token : undefined; // 如果是Bearer类型的token，返回token；否则返回undefined
  }
}

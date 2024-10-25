import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 已有的方法，用于获取用户信息
  @Get("/userInfo")
  getUserInfo(): string {
    return this.userService.getUserInfo();
  }

  // 新增的方法，用于根据用户名查询用户信息
  @Get("/findOne")
  async findOne(@Query('username') username: string, @Res() res) {
    try {
      const result = await this.userService.findOne(username);
      if (result.code === 200) {
        // 成功找到用户信息
        res.status(HttpStatus.OK).json(result);
      } else if (result.code === 600) {
        // 未找到用户信息
        res.status(HttpStatus.NOT_FOUND).json(result);
      } else {
        // 其他错误
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
      }
    } catch (error) {
      // 处理异常情况
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: 503,
        msg: 'Service error',
      });
    }
  }
}
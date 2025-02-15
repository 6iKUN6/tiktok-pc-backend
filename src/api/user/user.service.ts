import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.excetion';
import encry from 'src/utils/crypto';
import { User } from './entity/user.entity';
import { RegisterDto, LoginDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password, email } = registerDto;
    const existUser = await this.userModel.findOne({
      where: { username },
    });

    if (existUser) throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    try {
      const newUser = new User();
      newUser.username = username;
      newUser.password = password;
      newUser.email = email;
      await newUser.save();
      return '注册成功！';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.findOne(username);
    if (user.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.PASSWORD_ERR);
    }
    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    }; //返回包含username和id的jwt
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({
      where: { username },
    });

    if (!user) throw new ApiException('用户名不存在', ApiErrorCode.USER_NOTEXIST);
    return user;
  }
}

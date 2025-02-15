import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { RegisterVo, LoginVo } from './vo/user.vo';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Public } from 'src/api/auth/pulic/pulic.decorator';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({
    summary: '添加用户', // 接口描述信息
  })
  @ApiOkResponse({
    description: '返回示例',
    type: RegisterVo,
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Public()
  @ApiOperation({
    summary: '用户登录',
  })
  @ApiOkResponse({
    description: '返回示例',
    type: LoginVo,
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('userInfo')
  getUserInfo() {}

  @Public()
  @Get('captcha')
  getCaptcha() {
    return this.userService.getCaptcha();
  }

  // @UseGuards(UserGuard)
  // @Post('test')
  // t() {
  //   return 1;
  // }
}

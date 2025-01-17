import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: '注册成功' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}

export class LoginUserVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: '登录成功' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}

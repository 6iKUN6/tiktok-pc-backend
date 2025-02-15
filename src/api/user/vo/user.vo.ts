import { ApiProperty } from '@nestjs/swagger';

export class RegisterVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: '注册成功' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}

export class LoginVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: 'eyJhbG...(加密后的密码)' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}

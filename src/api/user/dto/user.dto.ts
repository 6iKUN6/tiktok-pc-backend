import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
//检验规则
export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty({
    example: '只因',
    description: '用户名',
  })
  username: string;

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @ApiProperty({
    example: 'kunkun@qq.com',
    description: '邮箱',
  })
  email: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码不能少于6位',
  })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
}

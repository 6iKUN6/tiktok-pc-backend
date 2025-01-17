import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '添加用户', // 接口描述信息
  })
  @ApiOkResponse({
    description: '返回实例',
    type: CreateUserDto,
  })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // async findAll(): Promise<UserDto[]> {
  //   return this.userService.findAll();
  // }

  // // 已有的方法，用于获取用户信息
  // @Get('/userInfo')
  // getUserInfo(): string {
  //   // return this.userService.getUserInfo();
  //   return 'wdnmd';
  // }

  // // 新增的方法，用于根据用户名查询用户信息
  // @Post()
  // async create(@Body() userDto: UserDto): Promise<UserDto> {
  //   return userDto;
  // }
}

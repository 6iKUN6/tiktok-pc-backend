//pulic装饰器
import { SetMetadata } from '@nestjs/common';

// export const Public = (...args: string[]) => SetMetadata('public', args);
export const Public = () => SetMetadata('isPublic', true); //用来放行登录注册接口

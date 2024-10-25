import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../database/sequelize';
@Injectable()
export class UserService {
  getUserInfo(): string {
    return 'Hello 成功获取到用户信息';
  }
  async findOne(username:string):Promise<any|undefined>{
    //sql的查询语句
    const sql=`SELECT user_id id,real_name realName,role FROM user WHERE account_name='${username}'`;
    try {
      const res = await sequelize.query(sql,{
        type:Sequelize.QueryTypes.SELECT,//查询方式
        raw:true,//是否使用数组组装的方式展示结果
        logging:true,//是否将sql语句打印到控制台，默认为true
      });
      const user = res[0];//查出来的结果是一个数组，我们只取第一个
      if(user){
        return{
          code:200,//返回的状态码，可以自定义
          data:{
            user
          },
          msg:'Success'
        };
      }else{
        return{
          code:600,
          msg:'查无此人'
        }

      }
    } catch (error) {
      return {
        code:503,
        msg:`Service error:${error}`
      }
    }
  }
                      
}

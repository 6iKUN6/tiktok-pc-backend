// src/user/user.entity.ts
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Sequelize,
  DataType,
  BeforeSave,
} from 'sequelize-typescript';
import * as crypto from 'crypto';
import encry from '../../../utils/crypto';

@Table({
  tableName: 'user',
  timestamps: false, // 关闭默认的时间戳 createdAt 和 updatedAt
})
export class User extends Model<User> {
  @PrimaryKey //主键
  @AutoIncrement //自增
  @Column
  id: number; // 标记为主键，值自动生成

  @Column({ type: DataType.STRING(30) })
  username: string; // 用户名

  @Column({ allowNull: true })
  nickname: string; // 昵称

  @Column
  password: string; // 密码

  @Column({ allowNull: true })
  avatar: string; // 头像

  @Column({ allowNull: true })
  email: string; // 邮箱

  @Column({ allowNull: true })
  role: string; // 角色

  @Column({ allowNull: true })
  salt: string; //盐

  @Column({ type: 'timestamp', defaultValue: Sequelize.fn('CURRENT_TIMESTAMP') })
  create_time: Date;

  @Column({ type: 'timestamp', defaultValue: Sequelize.fn('CURRENT_TIMESTAMP') })
  update_time: Date;

  //插入数据库前把密码加密
  @BeforeSave
  static encry(instance) {
    //这里只能用静态方法，不然后导致实例类型错误，方法名和钩子名不能一致
    instance.salt = crypto.randomBytes(4).toString('base64'); //生成盐
    instance.password = encry(instance.password, instance.salt); //然后加密密码
  }
}

// //插入数据库前把密码加密
// User.beforeSave(async (user: User) => {
//   const salt = crypto.randomBytes(16).toString('base64'); //生成盐
//   user.salt = salt;
//   user.password = encry(user.password, salt); //然后加密密码
// });

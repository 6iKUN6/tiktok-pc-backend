// src/user/user.entity.ts
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Sequelize,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
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
  salt: string;

  @Column({ type: 'timestamp', defaultValue: Sequelize.fn('CURRENT_TIMESTAMP') })
  create_time: Date;

  @Column({ type: 'timestamp', defaultValue: Sequelize.fn('CURRENT_TIMESTAMP') })
  update_time: Date;
}

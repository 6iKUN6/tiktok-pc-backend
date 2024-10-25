-- 创建 video 数据库
CREATE DATABASE IF NOT EXISTS `video` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用 video 数据库
USE `video`;

-- 删除现有的 user 表，以避免在初始化时出现错误
DROP TABLE IF EXISTS `user`;

-- 创建 user 表
CREATE TABLE `user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `real_name` VARCHAR(100) NOT NULL COMMENT '用户的真实姓名',
  `role` VARCHAR(50) NOT NULL COMMENT '用户的角色',
  `account_name` VARCHAR(50) NOT NULL COMMENT '用户的账号名',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `account_name_unique` (`account_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';

-- 插入初始用户数据
INSERT INTO `user` (`real_name`, `role`, `account_name`) VALUES
('张三', '管理员', 'zhangsan'),
('李四', '编辑', 'lisi'),
('王五', '普通用户', 'wangwu');

-- 插入额外的用户数据
INSERT INTO `user` (`real_name`, `role`, `account_name`) VALUES
('赵六', '开发者', 'zhaoliu'),
('孙七', '设计师', 'sunqi'),
('周八', '产品经理', 'zhouba');

-- 显示 user 表的结构
SHOW CREATE TABLE `user`;

-- 显示 user 表中的记录
SELECT * FROM `user`;
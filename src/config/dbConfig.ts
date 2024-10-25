const dbConfig = {
  mysql: {
    port: 3306, //数据库端口
    host: '127.0.0.1', //数据库地址
    user: 'root', //用户名
    password: '123456', //数据库密码
    database: 'video', //数据库名
    connectionLimit: 10, //链接限制
  },
};
export default dbConfig;

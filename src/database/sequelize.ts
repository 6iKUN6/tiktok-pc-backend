import { Sequelize } from 'sequelize-typescript';
import db from '../config/dbConfig'

const sequelize = new Sequelize(
    db.mysql.database,
    db.mysql.user,
    db.mysql.password || null,
    {
        // 自定义主机，默认值：localhost
        host: db.mysql.host,
        // 自定义端口，默认值：3306，这里有个问题，port需要的数据类型是number，所以在db定义port的
        // 时候要注意了
        port: db.mysql.port,
        dialect: 'mysql',
        pool: {
            max: db.mysql.connectionLimit,//连接池中最大连接数量
            min: 0,//最小链接数量
            acquire: 30000,
            idle: 10000//如果一个线程10秒钟没有使用的话，就释放该线程
        },
        timezone: '+08:00'//东八时区
    })

// 测试数据库连接
sequelize.authenticate().then(() => {
    console.log("数据库连接成功");
}).catch((err: any) => {
    // 数据库连接失败
    console.error("err");
    throw err;
})
export default sequelize;

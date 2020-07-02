/**
 * @description 数据库连接配置
 * @author zr
 */
const { isProd } = require('../utils/env')
//redis 配置
let RedisConfig = {
  host: '127.0.0.1',
  port: 6379
}

//mysql 配置
let mysqlConfig = {
  //host: 'lvchuang.f3322.net',
  host: '192.168.1.197',
  port: '3306',
  dialect: 'mysql',
  user: 'root',
  password: '321lvchuang,./',
  database: 'zz_work_db',
  max: 5,  //连接池最大连接数
  min: 0,  //最小连接数
  acquire: 30000,  //
  idle: 10000   //一个 连接池10s没有被使用,则释放
}



if (isProd) {
  // 线上的redis配置
  RedisConfig = {
    port: 6379,
    host: '127.0.0.1'
  }
  // 线上的mysql配置
  mysqlConfig = {
    host: '192.168.1.197',
    port: '3306',
    dialect: 'mysql',
    user: 'root',
    password: '321lvchuang,./',
    database: 'zz_work_db'
  }
}

module.exports = {
  RedisConfig,
  mysqlConfig
}
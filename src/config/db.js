/**
 * @description 数据库连接配置
 * @author zr
 */
const { isProd } = require('../utils/env')
let RedisConfig = {
  port: 6379,
  host: '127.0.0.1'
}

if (isProd) {
  // 线上的redis配置
  RedisConfig = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  RedisConfig
}
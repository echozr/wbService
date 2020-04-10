/**
 * @description sequelize 实例
 * @author zr
 */
const Sequelize = require('sequelize')
const { mysqlConfig } = require('../config/db')
const { host, user, password, dialect, database, port, max, min, acquire, idle } = mysqlConfig
const { isProd, isTest } = require('../utils/env')
const config = {
  host,
  port,
  dialect,
}
// 连接池配置（线上环境使用）
if (isProd) {
  config.pool = {
    max,  //连接池最大连接数
    min,  //最小连接数
    acquire,
    idle  //一个 连接池10s没有被使用,则释放
  }
}
// 测试环境下不打印 sql语句
if (isTest) {
  config.logging = () => {}
}

const seq = new Sequelize(database, user, password, config)

// 测试连接
// seq.authenticate().then(() => {
//   console.log("ok")
// }).catch(() => {
//   console.log('err')
// })

module.exports = seq
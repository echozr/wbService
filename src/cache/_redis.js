/**
 * @description 连接redis的方法
 * @author zr
 */
const redis = require('redis')
const { RedisConfig } = require('../config/db')

//创建客户端
const redisClient = redis.createClient(RedisConfig.port, RedisConfig.host)
redisClient.on('error', err => {
  console.log('redis error', err)
})

/**
 * redis set
 * @param {string} key  键
 * @param {string} value  值
 * @param {number} timeout  过期时间，单位s
 */
function set(key, value, timeout = 60 * 60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key  键
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get("key", (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
        return
      } catch (ex) {
        resolve(val)
        return
      }
    })
  })
  return promise
}

module.exports = {
  get,
  set
}
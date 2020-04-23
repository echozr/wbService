/**
 * @description 加密方法
 * @author zr
 */

const crypto = require('crypto') //node.js 自带加密模块
const { CRYPTO_KEY } = require('../config/constant') // 秘钥

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */

function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_KEY}`
  return _md5(str)
}

module.exports = doCrypto
/**
 * @description user service
 * @author zr
 */

const { User } = require('../db/models/index')
const {formatUser} =require('./_format')

/**
 * 获取用户信息
 * @param {string} userName  用户名
 * @param {string} password  密码
 */

async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickname', 'picture', 'city'],
    where: whereOpt
  })
  if (result === null) {
    //未找到
    return result
  }
  //格式化
  const formatRes=formatUser(result.dataValues)
  return formatRes
}

module.exports = {
  getUserInfo
}
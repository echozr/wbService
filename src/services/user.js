/**
 * @description user service
 * @author zr
 */

const { User } = require('../db/models/index')
const { formatUser } = require('./_format')
const user = require('../controller/user')

/**
 * 获取用户信息
 * @param {string} userName  用户名
 * @param {string} password  密码
 */

async function getUserInfo(userName, password) {
  // 查询条件
  debugger
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickname', 'picture', 'city', 'gender'],
    where: whereOpt
  })
  if (result === null) {
    //未找到
    return result
  }
  //格式化
  debugger
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * 创建用户 
 * @param {string} userName  用户名
 * @param {string} password  密码
 * @param {number} gender  性别
 * @param {string} nickname  昵称
 */
async function createUser({ userName, password, gender = 3, nickname }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickname: nickname ? nickname : userName
  })
  return result.dataValues
}

/**
 * 修改用户信息
 * @param {object} param0   修改的内容 {newPassword,newNickName,newCity,newPicture}
 * @param {object} param1   查询的内容 {userName,password}
 */

async function updateUser({ newPassword, newNickName, newCity, newPicture, newGender }, { userName, password }) {
  debugger
  //拼接修改内容
  const changeData = {}
  newPassword ? changeData.password = newPassword : ''
  newNickName ? changeData.nickname = newNickName : ''
  newCity ? changeData.city = newCity : ''
  newPicture ? changeData.picture = newPicture : ''
  newGender ? changeData.gender = newGender : ''
  //拼接查询条件
  const whereData = {
    userName
  }
  password ? whereData.password = password : ''

  //执行数据库操作
  const result = await User.update(changeData, {
    where: whereData
  })
  console.log(result)
  return result[0] > 0 // 表示 执行操作成功的行数 大于1
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser
}
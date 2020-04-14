/**
 * @description  user controller
 * @author zr
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require('../model/ErrorInfo')
const doCrypto= require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName   用户名
 */
async function isExist(userName) {
  // 业务逻辑处理
  // 调用services 获取数据
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new SuccessModel(userInfo)
  } else {
    // 用户名不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1.男，2女，3保密）
 */
async function register({ userName, password, gender }) {
  // 调用services 获取数据
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  //实现注册功能  调用services
  try {
    await createUser({ userName, password:doCrypto(password), gender })
    return new SuccessModel('恭喜你，注册成功！')
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}
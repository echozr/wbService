/**
 * @description  user controller
 * @author zr
 */

const { getUserInfo, createUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
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
    return new ErrorModel(errorInfo.registerUserNameNotExistInfo)
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
    return new ErrorModel(errorInfo.registerUserNameExistInfo)
  }
  //实现注册功能  调用services
  try {
    await createUser({ userName, password: doCrypto(password), gender })
    return new SuccessModel('恭喜你，注册成功！')
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(errorInfo.registerFailInfo)
  }
}

/**
 * 用户登录
 * @param {object} ctx  koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login({ ctx, userName, password }) {
  //获取用户信息

  const userInfo = await getUserInfo(userName, doCrypto(password))
  // 获取用户信息失败，登录失败
  if (!userInfo) {
    return new ErrorModel(errorInfo.loginFailInfo)
  }
  // 登录成功后，ctx.session.userInfo赋值
  ctx.session.userInfo = userInfo
  return new SuccessModel({
    userInfo
  })
}

/**
 * 修改用户信息
 * @param {object} ctx  ctx
 * @param {string} nickname  昵称
 * @param {string} city  城市
 * @param {string} picture  头像
 * @param {string} gender 性别
 * 
 */
async function changeInfo({ ctx, nickname, city, picture, gender }) {
  // 从session中获取用户信息
  const { userName } = ctx.session.userInfo
  // 如果昵称为空 将userName 赋值给nickName
  if (!nickname) {
    nickname = userName
  }
  // 调用services
  const result = await updateUser({
    newNickName: nickname,
    newCity: city,
    newPicture: picture,
    newGender: gender
  }, { userName })
  // 执行成功
  if (result) {
    // 更新session 中存储的数据
    Object.assign(ctx.session.userInfo, {
      nickname,
      city,
      picture,
      gender
    })
    return new SuccessModel('恭喜你，修改信息成功！')
  }
  return new ErrorModel(errorInfo.changeInfoFailInfo)
}
/**
 * 修改密码
 * @param {object} ctx  ctx 
 * @param {string} password  原始密码 
 * @param {string} newPassword  要改的密码
 */
async function changePassword({ ctx, password, newPassword }) {
  // 从session中获取用户信息
  const { userName } = ctx.session.userInfo
  // 调用services
  const result = await updateUser({
    newPassword: doCrypto(newPassword)
  }, { userName, password: doCrypto(password) })
  // 执行成功
  if (result) {
    return new SuccessModel('恭喜你，修改密码成功！')
  }
  return new ErrorModel(errorInfo.changePasswordFailInfo)
}


/**
 * 根据用户名获用户信息
 * @param {string} userName 
 */
async function getUser(userName) {
  debugger
  const result = await getUserInfo(userName)
  if(result){
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getUserInfoFailInfo)
}



/**
 * 退出用户登录
 * @param {object} ctx  ctx
 */
async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel('恭喜你，退出成功！')
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  getUser,
  logout
}
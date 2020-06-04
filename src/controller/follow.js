/**
 * @description follow controller
 * @author zr
 */

const { findFollowRelation, createFollow, deleteFollow, getFollowerByUserId, getFansByFollowerId, getFansAndFollowerByUserId } = require('../services/follow')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')

/**
 * 判断是否关注（登录用户和被查询人）
 * @param {number} followerId  被关注用户id
 * @param {object} ctx  ctx object
 */
async function isFollow(followerId, ctx) {
  const { id: userId } = ctx.session.userInfo
  const result = await findFollowRelation(followerId, userId)
  if (result === 1) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.isFollowFailInfo)
}

/**
 * 添加关注
 * @param {number} followerId  被关注人ID
 * @param {Object} ctx  ctx object
 */
async function addFollow(followerId, ctx) {
  const { id: userId } = ctx.session.userInfo
  try {
    const result = await createFollow(followerId, userId)
    return new SuccessModel(result)
  } catch (error) {
    return new ErrorModel(errorInfo.addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} followerId  被关注人id
 * @param {object} ctx 
 */
async function unFollow(followerId, ctx) {
  const { id: userId } = ctx.session.userInfo
  const result = await deleteFollow(followerId, userId)
  if (result) {
    return new SuccessModel('取关成功')
  }
  return new ErrorModel(errorInfo.unFollowFailInfo)
}

/**
 * 根据userId 获取关注列表
 * @param {object} ctx 
 */
async function getFollowerList(ctx) {
  const { id: userId } = ctx.session.userInfo
  const result = await getFollowerByUserId({ userId })
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.addFollowerFailInfo)
}

/**
 * 根据当前登录用户ID 获取谁关注了
 * @param {number} pagesize 
 * @param {number} pageIndex 
 * @param {object} ctx 
 */
async function getFansList(pagesize = 10, pageIndex = 0, ctx) {
  const { id: followerId } = ctx.session.userInfo
  const result = await getFansByFollowerId({ pagesize, pageIndex, followerId })
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getFansByFollowerIdFailInfo)
}

/**
 * 根据用户名获取粉丝数量及关注数
 * @param {string} userName 
 */
async function getFansAndFollowerCount(userName) {
  const result = await getFansAndFollowerByUserId(userName)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getFansByFollowerIdFailInfo)
}

module.exports = {
  isFollow,
  addFollow,
  unFollow,
  getFollowerList,
  getFansList,
  getFansAndFollowerCount
}
/**
 * @description follow service
 * @author zr
 */

const { User, UserRelation } = require('../db/models/index')
const { formatUser } = require('./_format.js')
const Sequelize = require('sequelize')


/**
 * 查询是否关注
 * @param {number} followerId  被关注人id
 * @param {number} userId  用户id 
 */
async function findFollowRelation(followerId, userId) {
  // 查询条件
  const whereOpt = {
    userId,
    followerId

  }
  // 查询
  const result = await UserRelation.findOne({
    where: whereOpt
  })
  console.log(result)
  if (result === null) {
    return 0
  }
  return 1
}

/**
 * 添加关注
 * @param {number} followerId  被关注人ID
 * @param {number} userId  用户ID
 */

async function createFollow(followerId, userId) {
  const result = await UserRelation.create({
    followerId,
    userId
  })
  console.log(result)
  return result.dataValues
}

/**
 * 取消关注 
 * @param {number} followerId  被关注人ID 
 * @param {number} userId  当前登录人ID
 */
async function deleteFollow(followerId, userId) {
  const result = await UserRelation.destroy({
    where: {
      followerId,
      userId
    }
  })
  console.log(result)
  return result

}

/**
 * 根据userId获取关注人信息
 * @param {number} userId 用户信息
 */
async function getFollowerByUserId({ pagesize, pageIndex, userId }) {
  debugger
  const result = await UserRelation.findAndCountAll({
    where: {
      userId
    },
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture', 'id' ,'city'],
        required: false,
      }
    ]
  })
  const followerList = result.rows.map(v => {
    let user = v.user
    return formatUser(user.dataValues)
  })
  return {
    count: result.count,
    userList: followerList
  }
}

/**
 * 通过被关注人信息获取粉丝列表
 * @param {number} pagesize 
 * @param {number} pageIndex 
 * @param {number} followerId 
 */
async function getFansByFollowerId({ pagesize, pageIndex, followerId }) {
  debugger
  const result = await User.findAndCountAll({
    attributes: ['userName', 'nickname', 'picture', 'id', 'city'],
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: UserRelation,
      where: {
        followerId
      }
    }]
  })
  const FansList = result.rows.map(v => formatUser(v.dataValues))
  return {
    count: result.count,
    userList: FansList
  }
}

/**
 * 根据用户ID获取粉丝数和关注数量
 * @param {number} userId 
 */
async function getFansAndFollowerByUserId(userName) {
  const fans = await User.findAndCountAll({
    where: {
      userName
    },
    include: [{
      model: UserRelation,
      required: true
    }]
  })
  const follower = await UserRelation.findAndCountAll({
    include: [{
      model: User,
      where: {
        userName
      }
    }]
  })
  return {
    followerCount:follower.count,
    fansCount:fans.count
  }
}

module.exports = {
  findFollowRelation,
  createFollow,
  deleteFollow,
  getFollowerByUserId,
  getFansByFollowerId,
  getFansAndFollowerByUserId
}
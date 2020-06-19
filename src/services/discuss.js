/**
 * @description discuss service
 * @author zr
 */

const { Blog, BlogUpload, User, Praise, UserRelation, Discuss } = require('../db/models/index')
const { formatUser } = require('./_format.js')
const Sequelize = require('sequelize')

/**
 * 添加评论
 * @param {number} blogId  博客Id
 * @param {number} parentId  顶层评论Id
 * @param {string} content  评论内容
 * @param {number} userId  用户Id
 */
async function createDiscuss({ blogId, parentId, content, userId }) {
  // 创建评论
  debugger
  const result = await Discuss.create({
    content,
    userId,
    blogId,
    parentId
  })
  console.log(result)
  return result.dataValues
}

/**
 * 根据博客ID 获取评论 
 * @param {number} blogId 
 */
async function getDiscussByBlogId(blogId) {
  debugger
  const result = await Discuss.findAndCountAll({
    where: {
      blogId
    },
    attributes: ['id', 'userId', 'blogId', 'parentId', 'content', 'createdAt'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture'],
      }
    ]
  })
  // 数据结构处理
  const allList = result.rows.map(v => v.dataValues)
  const parentList = allList.filter(v => v.parentId === -1)
  const list = parentList.map(item => {
    const children = allList.filter(x => x.parentId === item.id)
    item.children = children
    return item
  })
  return {
    count: result.count,
    list,
  }
}

/**
 * 根据评论Id 删除评论
 * @param {*} discussId 
 * @param {*} parentId 
 * @param {*} userId 
 */
async function deleteDiscuss(discussId, userId) {
  const whereOpt = {
    userId,
    parentId: -1,
    id: discussId
  }
  const whereOpt1 = {
    userId,
    parentId: discussId,
  }

  const result = await Discuss.destroy({
    where: {
      [Sequelize.Op.or]: [
        whereOpt, whereOpt1
      ]
    }
  })
  return (result)
}

/**
 * 删除单条子评论
 * @param {number} userId session 中获取的用户ID 
 * @param {number} id 评论ID
 */
async function deleteSonDiscuss(discussId, userId) {
  const whereOpt = {
    userId,
    id: discussId
  }
  const result = await Discuss.destroy({
    where: whereOpt
  })
  return (result)
}

/**
 * 根据评论Id  获取相关评论及子评论
 * @param {number} discussId 
 */
async function findAllDiscussById(discussId) {
  debugger
  const result = await Discuss.findAndCountAll({
    where: {
      [Sequelize.Op.or]: [
        {
          id: discussId
        }, 
        {
          parentId: discussId
        }
      ],
    },
    attributes: ['id', 'userId', 'blogId', 'parentId', 'content', 'createdAt'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture'],
      }
    ]
  })
  // 数据结构处理
  const allList = result.rows.map(v => v.dataValues)
  const parentList = allList.filter(v => v.parentId === -1)
  const list = parentList.map(item => {
    const children = allList.filter(x => x.parentId === item.id)
    item.children = children
    return item
  })
  return {
    count: result.count,
    list,
  }
}

module.exports = {
  createDiscuss,
  getDiscussByBlogId,
  deleteDiscuss,
  deleteSonDiscuss,
  findAllDiscussById
}
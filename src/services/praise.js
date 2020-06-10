/**
 * @description praise services
 * @author zr
 */

const { Blog, Praise, User } = require('../db/models/index')
const { formatUser } = require('./_format')

/**
 * 点赞
 * @param {number} userId  用户ID
 * @param {number} blogId  博客ID
 */
async function createPraise(userId, blogId) {
  const result = await Praise.create({
    userId,
    blogId
  })
  console.log(result)
  return result
}

/**
 * 取消点赞
 * @param {number} userId  用户ID
 * @param {number} blogId  博客ID
 */
async function deletePraise(userId, blogId) {
  const result = await Praise.destroy({
    where: {
      userId,
      blogId
    }
  })
  return result
}

/**
 * 根据博客ID 查询点赞
 * @param {number} blogId 博客 
 */
async function getPraiseByBlogId(blogId) {
  const result = await Praise.findAndCountAll({
    where: {
      blogId
    },
    attributes: ['userId', 'blogId'],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture', 'city'],
      }
    ]
  })
  const list = result.rows.map(v => {
    const item = v.dataValues
    item.user = formatUser(item.user)
    return item
  })
  return {
    count: result.count,
    list
  }
}



module.exports = {
  createPraise,
  deletePraise,
  getPraiseByBlogId
}
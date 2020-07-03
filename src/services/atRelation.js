/**
 * @description atRelation services服务
 * @author zr
 */

const { AtRelation, Blog, User, BlogUpload, Praise, Discuss } = require('../db/models/index')
const { formatUser } = require('./_format.js')

/**
 * 插入用户AT关系
 * @param { object} param0  blogId, userId, discussId, type
 */
async function createAtRelation({ blogId, userId, discussId, type }) {
  debugger
  const whereOpt = {
    blogId,
    userId,
    type
  }
  if (discussId) {
    Object.assign(whereOpt, { discussId })
  }
  const result = await AtRelation.create(whereOpt)
  console.log(result.dataValues)
  return result.dataValues
}

/**
 * 通过用户Id 查询所有未读的@数量(isRead=false)
 * @param {number} userId  用户Id
 */
async function getTotalAtCountByUser(userId) {
  const whereOpt = {
    userId,
    isRead: false
  }
  const result = await AtRelation.findAndCountAll({
    where: whereOpt
  })
  const datalist = result.rows.map(v => v.dataValues)
  const blog = datalist.filter(v => v.type === 'blog').length
  const discuss = datalist.filter(v => v.type === 'discuss').length
  return {
    total: result.count,
    blog,
    discuss
  }
}
/**
 * 被at后读取后改变状态
 * @param {number} userId 用户ID
 * @param {number} blogId 博客ID
 * @param {number} discussId  评论ID
 */
async function changeIsReadTrue(userId, blogId, discussId) {
  debugger
  // 拼接修该内容
  const changeData = {
    isRead: true
  }
  // 查询条件
  const whereOpt = {
    userId,
    blogId
  }
  if (discussId) {
    Object.assign(whereOpt, { discussId })
  } else {
    Object.assign(whereOpt, { discussId: null })
  }
  // 执行更新方法
  const result = await AtRelation.update(changeData, {
    where: whereOpt
  })
  console.log(result)
  return result[0] > 0 // 表示 执行操作成功的行数 大于1
}

/**
 * 根据用户ID获取 at 我的未读博客
 * @param {number} userId  用户ID 
 */
async function getNotReadBlogList(userId) {
  debugger
  const result = await Blog.findAndCountAll({
    attributes: ['id', 'content', 'createdAt'],
    order: [['id', 'desc']],
    distinct: true,
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId,
          isRead: false,
          type: 'blog'
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture', 'city'],
        // required: false,
      },
      {
        model: BlogUpload,
        attributes: ['image']
        // required: false,
      },
      {
        model: Praise
      },
      {
        model: Discuss
      }
    ]
  })

  // 处理返回数据格式
  const blogList = result.rows.map(item => item.dataValues)
  const list = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    const atRelations = blogItem.atRelations.map(v => v.dataValues)
    const blogUploads = blogItem.blogUploads.map(v => v.dataValues.image)
    const praiseCount = blogItem.praises.length
    const praisePerson = blogItem.praises.filter(item => item.dataValues.userId === userId)
    blogItem.user = formatUser(user)
    blogItem.blogUploads = blogUploads
    blogItem.atRelations = atRelations
    blogItem.praises = praiseCount
    blogItem.discusses = blogItem.discusses.length
    blogItem.praisePerson = praisePerson.length > 0 ? true : false
    return blogItem
  })
  // 返回数据
  return {
    count: result.count,
    blogList: list
  }
}

/**
 * 根据用户ID获取 at 未读评论带微博
 * @param {number} userId 
 */
async function getNotReadDiscussList(userId) {
  debugger
  const result = await Discuss.findAndCountAll({

    attributes: ['createdAt', 'content'],
    order: [
      ['id', 'desc']
    ],
    distinct: true,
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId', 'discussId'],
        where: {
          userId,
          isRead: false,
          type: 'discuss'
        },
        include:[
          {
            model: Blog,
            attributes: ['content'],
            include: [
              {
                model: User,
                attributes: ['userName', 'nickname', 'picture'],
              }
            ]
          }
        ]
      },
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture'],
      },
    ]
  })
  console.log(result)
  return result

}


module.exports = {
  createAtRelation,
  getTotalAtCountByUser,
  changeIsReadTrue,
  getNotReadBlogList,
  getNotReadDiscussList
}

/**
 * @description blog service
 * @author zr
 */

const { Blog, BlogUpload, User, Praise, Discuss } = require('../db/models/index')
const { getUserInfo } = require('./user')
const { createAtRelation } = require('./atRelation')
const { formatUser } = require('./_format.js')
const { REG_FOR_AT_WHO } = require('../config/constant')
/**
 * 创建微博
 * @param {string} content 微博内容
 * @param {number} userId  用户id
 * @param {Array} image 图片附件
 */

async function creatBlog({ content, image, userId, ctx }) {
  // 从创建微博中获取@的userName相关信息
  debugger
  const userNameArr = []
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    userNameArr.push(userName)
    return matchStr
  })
  // 根据用户名获取用户信息
  const userList = await Promise.all(
    userNameArr.map(v => getUserInfo(v))
  )
  // 根据用户信息获取 userId 数组
  const userIdArr = userList.map(v => v.id)

  // 插入微博
  const result = await Blog.create({
    content,
    userId
  })

  // 创建@relation 关系
  const result1 = await Promise.all(userIdArr.map(userId => createAtRelation({ blogId: result.id, userId, type: 'blog' })))
  console.log(result1)

  const blog = result.dataValues
  // 插入微博图片
  if (image.length > 0) {
    let blogImages = []
    for (let i in image) {
      let item = {
        blogId: blog.id,
        image: image[i]
      }
      blogImages.push(item)
    }
    const result1 = await BlogUpload.bulkCreate(blogImages)
    if (result1.length > 0) {
      const imageArr = result1.map(v => {
        return v.dataValues.image
      })
      Object.assign(blog, { image: imageArr })
    }
  } else {
    Object.assign(blog, { image: [] })
  }
  blog.user = {
    city: ctx.session.userInfo.city,
    nickname: ctx.session.userInfo.nickname,
    picture: ctx.session.userInfo.picture,
    userName: ctx.session.userInfo.userName
  }
  return blog
}

/**
 * 通过用户查询微博列表，并返回附件图片 
 * 如果userName有值，查指定人的微博，如果没有值，查全部
 * @param {string} userName  用户名
 * @param {number} pagesize  页数
 * @param {number} pageIndex  页码
 */

async function getList({ userName, pagesize, pageIndex, ctx }) {
  const { id: userId } = ctx.session.userInfo
  debugger
  // 拼接查询条件
  const pagesize1 = Number(pagesize)
  const pageIndex1 = Number(pageIndex)
  const whereOpts = {
  }
  if (userName) {
    whereOpts.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    attributes: ['id', 'content', 'createdAt'],
    limit: pagesize1,
    offset: pageIndex1 * pagesize1,
    order: [
      ['id', 'desc']
    ],
    distinct: true,  // 去重
    include: [
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture', 'city'],
        where: whereOpts
        // required: false,
      },
      {
        model: BlogUpload,
        attributes: ['image']
        // required: false,
      },
      {
        model: Praise,
        attributes: ['id', 'userId']
      },
      {
        model: Discuss,
        attributes: ['id', 'userId']
      }
    ]
  })
  // 处理返回数据格式
  const blogList = result.rows.map(item => item.dataValues)
  const list = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    const blogUploads = blogItem.blogUploads.map(v => v.dataValues.image)
    const praiseCount = blogItem.praises.length
    const praisePerson = blogItem.praises.filter(item => item.dataValues.userId === userId)
    blogItem.user = formatUser(user)
    blogItem.blogUploads = blogUploads
    blogItem.praises = praiseCount
    blogItem.discusses = blogItem.discusses.length
    blogItem.praisePerson = praisePerson.length > 0 ? true : false
    return blogItem
  })
  // 返回数据
  return {
    count: result.count,
    blogList: list,
    pagesize,
    pageIndex
  }
}

async function getUpload(userName) {
  const whereOpts = {
    userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    distinct: true,  // 去重
    include: [
      {
        model: User,
        where: whereOpts
      },
      {
        model: BlogUpload,
        attributes: ['image', 'createdAt'],
      }
    ]
  })
  // 处理返回数据格式
  const list = result.rows.map(item => item.dataValues.blogUploads)
  const pictureList = []
  for (let i in list) {
    if (list[i].length > 0) {
      for (let x in list[i]) {
        const Time = new Date(list[i][x].dataValues.createdAt)
        const month = Time.getMonth() + 1 < 10 ? '0' + (Time.getMonth() + 1) : Time.getMonth() + 1
        const Time1 = `${Time.getFullYear()}-${month}`
        pictureList.push({
          time: Time1,
          image: list[i][x].image
        })
      }
    }
  }
  // 返回数据
  return {
    list: pictureList
  }
}

/**
 * 通过ID 获取详情
 * @param {number} blogId 
 */
async function getBlogItem(blogId, ctx) {
  const { id: userId } = ctx.session.userInfo
  debugger
  const result = await Blog.findAndCountAll({
    where: {
      id: blogId
    },
    attributes: ['content', 'id', 'createdAt'],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture', 'city', 'id']
      },
      {
        model: BlogUpload,
        attributes: ['image']
        // required: false,
      },
      {
        model: Praise,
        attributes: ['id', 'userId']
      }
    ]
  })
  console.log(result)
  const blogList = result.rows.map(item => {
    const blogItem = item.dataValues
    const user = blogItem.user.dataValues
    const blogUploads = blogItem.blogUploads.map(v => v.dataValues.image)
    const praiseCount = blogItem.praises.length
    const praisePerson = blogItem.praises.filter(item => item.dataValues.userId === userId)
    blogItem.user = formatUser(user)
    blogItem.blogUploads = blogUploads
    blogItem.praises = praiseCount
    blogItem.praisePerson = praisePerson.length > 0 ? true : false
    return blogItem
  })
  return blogList[0]

}


/**
 * 根据博客Id 删除博客
 * @param {*} blogId 
 * @param {*} userId 
 */
async function deleteBlog(blogId, userId) {
  const whereOpt = {
    id: blogId,
    userId
  }
  const result = await Blog.destroy({
    where: whereOpt
  })
  return (result)
}


module.exports = {
  creatBlog,
  getList,
  getUpload,
  getBlogItem,
  deleteBlog
}
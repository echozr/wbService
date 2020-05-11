/**
 * @description blog service
 * @author zr
 */

const { Blog, BlogUpload, User } = require('../db/models/index')
const { formatUser } = require('./_format.js')
/**
 * 创建微博
 * @param {string} content 微博内容
 * @param {number} userId  用户id
 * @param {Array} image 图片附件
 */

async function creatBlog({ content, image, userId }) {
  // 插入微博
  const result = await Blog.create({
    content,
    userId
  })
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
    if (result1.length > 1) {
      Object.assign(blog, { image })
    }
  } else {
    Object.assign(blog, { image: [] })
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

async function getList({ userName, pagesize, pageIndex }) {
  // 拼接查询条件
  debugger
  const whereOpts = {
  }
  if (userName) {
    whereOpts.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    attributes: ['id', 'content'],
    limit: pagesize,
    offset: pageIndex * pagesize,
    order: [
      ['id', 'desc']
    ],
    distinct: true,  //去重
    include: [
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture'],
        where: whereOpts,
        required: false,
      },
      {
        model: BlogUpload,
        attributes: ['image'],
        required: false,
      }
    ]
  })
  // 处理返回数据格式
  const blogList = result.rows.map(item => item.dataValues)
  const list = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    const blogUploads = blogItem.blogUploads.map(v => v.dataValues.image)
    blogItem.user = formatUser(user)
    blogItem.blogUploads = blogUploads
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

module.exports = {
  creatBlog,
  getList
}
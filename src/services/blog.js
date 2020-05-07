/**
 * @description blog service
 * @author zr
 */

const { Blog, BlogUpload } = require('../db/models/index')
/**
 * 创建微博
 * @param {string} content 微博内容
 * @param {number} userId  用户id
 * @param {Array} image 图片附件
 */

async function creatBlog({ content, image, userId }) {
  debugger
  const result = await Blog.create({
    content,
    userId
  })
  const blog = result.dataValues
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

module.exports = {
  creatBlog
}
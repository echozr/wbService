/**
 * @description blog controller
 * @author zr
 */

const { creatBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')
const xss = require('xss')

/**
 * 创建微博
 * @param {string} content 微博内容 
 * @param {string} image 附件图片
 * @param {object} ctx  ctx
 */
async function creatBlogs({ content, image, ctx }) {
  const { id: userId } = ctx.session.userInfo
  const NewImage=!image?[]:image
  // 创建微博
  debugger
  try {
    // 创建微博
    const blog = await creatBlog({
      userId,
      content: xss(content),
      image:NewImage
    })
    return new SuccessModel(blog)

  } catch (ex) {
    console.log(ex.message, ex.stack)
    return new ErrorModel(errorInfo.createBlogFailInfo)
  }


}

module.exports = {
  creatBlogs
}
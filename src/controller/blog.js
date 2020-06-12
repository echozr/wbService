/**
 * @description blog controller
 * @author zr
 */

const { creatBlog, getList, getUpload, getBlogItem, deleteBlog } = require('../services/blog')
const { getSquareCacheList } = require('../cache/blog')
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
  const NewImage = !image ? [] : image
  if (content) {
    // 创建微博
    try {
      // 创建微博 调用services
      const blog = await creatBlog({
        userId,
        content: xss(content),
        image: NewImage,
        ctx
      })
      return new SuccessModel(blog)

    } catch (ex) {
      console.log(ex.message, ex.stack)
      return new ErrorModel(errorInfo.createBlogFailInfo)
    }
  }
  return new ErrorModel(errorInfo.BlogContentFailInfo)
}

/**
 * 获取微博列表
 * @param {string} userName  用户名
 * @param {number} pagesize  每页多少条
 * @param {number} pageIndex  第几页
 * 
 */
async function getBlogList(userName, pagesize = 10, pageIndex = 0, ctx) {
  // 调用services
  const result = await getList({ userName, pagesize, pageIndex, ctx })
  debugger
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(errorInfo.getBlogListFailInfo)
  }
}

/**
 * 获取（缓存）微博首页
 * @param {number} pagesize  pagesize
 * @param {number} pageIndex  pageIndex
 */
async function getBlogSquare(pagesize = 10, pageIndex = 0) {
  // 调用缓存
  const result = await getSquareCacheList(pageIndex, pagesize)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new ErrorModel(errorInfo.getBlogListFailInfo)
  }
}

/**
 * 根据用户名获取所有微博的图片
 * @param {string} userName 
 */
async function getUploadByUser(userName) {
  const result = await getUpload(userName)
  if (result) {
    console.log(result)
    return new SuccessModel(result)
  } else {
    return new ErrorModel(errorInfo.getBlogListFailInfo)
  }
}


/**
 * 通过blogId获取博客详情
 * @param {number} blogId 
 */
async function getBlogInfo(blogId, ctx) {
  const result = await getBlogItem(blogId, ctx)
  if (result) {
    console.log(result)
    return new SuccessModel(result)
  } else {
    return new ErrorModel(errorInfo.getBlogListFailInfo)
  }
}

/**
 * 删除微博
 * @param {number} blogId 
 * @param {object} ctx 
 */
async function deleteBlogs(blogId, ctx) {
  const { id: userId } = ctx.session.userInfo
  const result = await deleteBlog(blogId, userId)
  if(result){
    return new SuccessModel(result)
  }else{
    return new ErrorModel(errorInfo.delBlogFail)
  }
}

module.exports = {
  creatBlogs,
  getBlogList,
  getBlogSquare,
  getUploadByUser,
  getBlogInfo,
  deleteBlogs
}
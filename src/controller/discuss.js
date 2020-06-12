/**
 * @description discuss controller
 * @author zr
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')
const { createDiscuss, getDiscussByBlogId ,deleteDiscuss } = require('../services/discuss')


/**
 * 添加评论
 * @param {number} blogId  博客Id
 * @param {number} parentId  顶层评论Id
 * @param {string} content  评论内容
 * @param {object} ctx  
 */
async function addDiscuss({ blogId, parentId, content, ctx }) {
  const { id: userId } = ctx.session.userInfo
  try {
    const result = await createDiscuss({ blogId, parentId, content, userId })
    return new SuccessModel(result)

  } catch (error) {
    console.log(error)
    return new ErrorModel(errorInfo.createDiscussFail)
  }
}

/**
 * 根据博客ID获取博客评论
 * @param {number} blogId 博客ID 
 */
async function getDiscuss(blogId) {
  const result = await getDiscussByBlogId(blogId)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getDiscussFail)
}

/**
 * 根据评论Id删除评论
 * @param {number} discussId 评论ID 
 * @param {object} ctx
 */
async function unDiscuss(discussId,ctx) {
  const { id: userId } = ctx.session.userInfo
  const result=await deleteDiscuss(discussId,userId)
  if(result){
    return new SuccessModel('删除成功')
  }
  return new ErrorModel(errorInfo.deleteDiscussFail)
}

module.exports = {
  addDiscuss,
  getDiscuss,
  unDiscuss
}
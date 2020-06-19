/**
 * @description discuss controller
 * @author zr
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')
const { createDiscuss, getDiscussByBlogId ,deleteDiscuss, deleteSonDiscuss,findAllDiscussById } = require('../services/discuss')
const user = require('../db/models/User')


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
    return new SuccessModel()
  }
  return new ErrorModel(errorInfo.deleteDiscussFail)
}

/**
 * 根据评论ID 删除一条子评论
 * @param {number} discussId 
 * @param {object} ctx 
 */
async function deleteOne(discussId, ctx) {
  const {id:userId}= ctx.session.userInfo
  const result = await deleteSonDiscuss(discussId,userId)
  if(result){
    return new SuccessModel()
  }
  return new ErrorModel(errorInfo.deleteDiscussFail)
}

/**
 * 通过评论ID 获取子评论
 * @param {number} discussId 
 */
async function getDiscussListById(discussId){
  const result = await findAllDiscussById(discussId)
  if(result){
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getDiscussListByIdFail)
}



module.exports = {
  addDiscuss,
  getDiscuss,
  unDiscuss,
  deleteOne,
  getDiscussListById
}
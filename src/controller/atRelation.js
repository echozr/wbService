/**
 * @description atRelation controller
 * @author zr
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')
const { getTotalAtCountByUser, changeIsReadTrue,getNotReadBlogList ,getNotReadDiscussList } = require('../services/atRelation')

/**
 * 获取所有被at的数量
 * @param {object} ctx  
 */
async function getAllAtCount(ctx) {
  debugger
  const { id: userId } = ctx.session.userInfo
  const result = await getTotalAtCountByUser(userId)
  if (result) {
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getAllAtCountFail)
}

/**
 * 改变未读状态
 * @param {object} ctx  
 * @param {number} blogId 
 * @param {munber} discussId 
 */
async function changeReadStatus(ctx, blogId, discussId) {
  debugger
  const { id: userId } = ctx.session.userInfo
  const result = await changeIsReadTrue(userId,blogId,discussId)
  console.log(result)
  if(result){
    return new SuccessModel(result)
  }
  // 此处不用处理成功 失败逻辑
}

/**
 * 根据用户名获取博客
 * @param {object} ctx 
 */
async function getAtBlogList(ctx){
  debugger
  const { id: userId } = ctx.session.userInfo
  const result = await getNotReadBlogList(userId)
  if(result){
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getAtBlogListFail)

}

/**
 * 根据登录用户获取未读@ 评论列表
 * @param {object} ctx 
 */
async function getAtDiscussList(ctx){
  debugger
  const {id:userId} =ctx.session.userInfo
  const result = await getNotReadDiscussList(userId)
  if(result){
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getAtDiscussListFail)
}

module.exports = {
  getAllAtCount,
  changeReadStatus,
  getAtBlogList,
  getAtDiscussList
}
/**
 * @description praise controller
 * @author zr
 */
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')
const  { createPraise, deletePraise, getPraiseByBlogId}=require('../services/praise')

/**
 * 微博点赞
 * @param {number} blogId 微博ID 
 * @param {object} ctx  ctx对象
 */
async function addPraise(blogId, ctx) {
  const { id: userId } = ctx.session.userInfo
  try {
    const result = await createPraise(userId, blogId)
    return new SuccessModel(result)
  } catch (err) {
    console.log(err)
    return new ErrorModel(errorInfo.addPraiseFail)
  }
}

/**
 * 取消点赞
 * @param {number} blogId 
 * @param {object} ctx 
 */
async function unPraise(blogId,ctx){
  const { id: userId } = ctx.session.userInfo
  const result = await deletePraise(userId, blogId)
  if(result){
    return new SuccessModel()
  }
  return new ErrorModel(errorInfo.unPraiseFail)
}

/**
 * 获取点赞列表
 * @param {number} blogId 
 */
async function getPraise (blogId){
  debugger
  const result =await getPraiseByBlogId(blogId)
  if(result){
    return new SuccessModel(result)
  }
  return new ErrorModel(errorInfo.getPraiseFail)

}



module.exports = {
  addPraise,
  unPraise,
  getPraise
}
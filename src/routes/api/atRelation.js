/**
 * @description atRelation API接口
 * @author zr
 */
const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const { getAllAtCount, changeReadStatus, getAtBlogList, getAtDiscussList } = require('../../controller/atRelation')
router.prefix('/atRelation')

// 获取所有被at的未读数量
router.post('/getAllAtCount', loginCheck, async (ctx, next) => {
  debugger
  ctx.body = await getAllAtCount(ctx)
})

// 将未读处理成已读
router.post('/changeRead', loginCheck, async (ctx, next) => {
  debugger
  const { blogId, discussId } = ctx.request.body
  ctx.body = await changeReadStatus(ctx, blogId, discussId)
})

// 获取at未读博客列表
router.post('/getAtBlog', loginCheck, async (ctx, next) => {
  debugger
  ctx.body = await getAtBlogList(ctx)
})

// 获取at未读评论列表
router.post('/getAtDiscuss', loginCheck, async (ctx, next) => {
  ctx.body = await getAtDiscussList(ctx)
})
module.exports = router
/**
 * @description 和点赞相关的接口
 * @author zr
 */

const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const {  addPraise,unPraise, getPraise } = require('../../controller/praise')

router.prefix('/praise')
debugger

// 点赞
router.post('/addPraise', loginCheck, async (ctx, next) => {
  const { blogId } = ctx.request.body
  ctx.body = await addPraise(blogId, ctx)
})

//取消点赞
router.post('/unPraise', loginCheck, async (ctx, next) => {
  const { blogId } = ctx.request.body
  ctx.body = await unPraise(blogId, ctx)
})

//获取点赞列表
router.post('/getPraise',async(ctx,next)=>{
  debugger
  const {blogId}=ctx.request.body
  ctx.body=await getPraise(blogId)
})

module.exports = router
/**
 * @description 评论router
 * @author zr
 */

const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const { addDiscuss,getDiscuss, unDiscuss } = require('../../controller/discuss')

router.prefix('/discuss')

// 添加评论
router.post('/addDiscuss', loginCheck, async (ctx, next) => {
  const { blogId, parentId, content } = ctx.request.body
  debugger
  ctx.body = await addDiscuss({ blogId, parentId, content, ctx })
})

// 根据博客Id 获取评论列表
router.post('/getDiscussList', loginCheck, async (ctx, next) => {
  const {blogId}=ctx.request.body
  debugger
  ctx.body=await getDiscuss(blogId)
})

// 根据评论Id 删除评论
router.post('/deleteDiscuss',loginCheck, async(ctx,next)=>{
  const {discussId}= ctx.request.body
  debugger
  ctx.body= await unDiscuss(discussId,ctx)
})

module.exports = router
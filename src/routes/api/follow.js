/**
 * @description 和关注相关的列表
 * @author zr
 */

const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const { isFollow, addFollow, unFollow, getFollowerList, getFansList, getFansCount, getFollowerCount } = require('../../controller/follow')

router.prefix('/follow')

// 判断当前用户是否关注
router.post('/isFollow', loginCheck, async (ctx, next) => {
  const { followerId } = ctx.request.body
  // 调用controller
  ctx.body = await isFollow(followerId, ctx)
})

// 关注
router.post('/addFollow', loginCheck, async (ctx, next) => {
  const { followerId } = ctx.request.body
  ctx.body = await addFollow(followerId, ctx)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { followerId } = ctx.request.body
  ctx.body = await unFollow(followerId, ctx)
})

// 获取关注列表
router.post('/getFollowerList', loginCheck, async (ctx, next) => {
  ctx.body = await getFollowerList(ctx)
})

// 获取粉丝列表
router.post('/getFansList', loginCheck, async (ctx, next) => {
  const { pagesize, pageIndex } = ctx.request.body
  ctx.body = await getFansList(pagesize, pageIndex, ctx)
})

// 根据用户名获取粉丝数量
router.post('/getFansCount', async (ctx, next) => {
  const { userId } = ctx.request.body
  ctx.body = await getFansCount(userId)
})

// 根据用户名获取关注数量
router.post('/getFollowerCount', async (ctx, next) => {
  const { userId } = ctx.request.body
  ctx.body = await getFollowerCount(userId)
})




module.exports = router
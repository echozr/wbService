/**
 * @description 和关注相关的列表
 * @author zr
 */

const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const { isFollow, addFollow, unFollow, getFollowerList, getFansList, getFansAndFollowerCount } = require('../../controller/follow')

router.prefix('/follow')

// 判断当前用户是否关注
router.post('/isFollow', loginCheck, async (ctx, next) => {
  debugger
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

// 根据ID获取关注数及粉丝
router.post('/getFansAndFollower', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await getFansAndFollowerCount(userName)
})




module.exports = router
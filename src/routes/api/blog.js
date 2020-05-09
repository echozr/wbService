/**
 * @description 博客 api 路由
 * @author zr
 */

const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const { creatBlogs, getBlogList } = require('../../controller/blog')
const { genValidator } = require('../../middlewares/validate')
const blogValidate = require('../../validator/blog')

router.prefix('/blog')

// 创建博客
router.post('/creatBlog', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  // 调用controller
  ctx.body = await creatBlogs({ content, image, ctx })
})

// 获取微博列表
router.post('/getBlogList', loginCheck, async (ctx, next) => {
  debugger
  const { userName, pagesize, pageIndex } = ctx.request.body
  // 调用controller
  ctx.body = await getBlogList({ userName, pagesize, pageIndex })

})

module.exports = router
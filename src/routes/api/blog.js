/**
 * @description 博客 api 路由
 * @author zr
 */

const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const { creatBlogs } = require('../../controller/blog')
const { genValidator } = require('../../middlewares/validate')
const blogValidate = require('../../validator/blog')

router.prefix('/blog')

// 创建博客
router.post('/creatBlog', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  debugger

  const { content, image } = ctx.request.body
  console.log(image)
  // 调用controller
  ctx.body = await creatBlogs({ content, image, ctx })
})


module.exports = router
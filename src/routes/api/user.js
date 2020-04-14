/**
 * @description user api 路由
 * @author zr
 */

const router = require('koa-router')()
const { isExist,register } = require('../../controller/user')

router.prefix('/api/user')
// 注册路由
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.query
  // 调用controller
  console.log(userName, password, gender)
  ctx.body=await register({userName, password, gender})
})
// 用户名是否已存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.query
  //调用controller
  ctx.body = await isExist(userName)
})

module.exports = router
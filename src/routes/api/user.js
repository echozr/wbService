/**
 * @description user api 路由
 * @author zr
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validate')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.query
  // 调用controller
  ctx.body = await register({ userName, password, gender })
})
// 用户名是否已存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.query
  //调用controller
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.query
  // 调用controller 
  ctx.body = await login({ctx, userName, password})
})

module.exports = router
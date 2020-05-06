/**
 * @description user api 路由
 * @author zr
 */

const router = require('koa-router')()
const { isExist, register, login, changeInfo, changePassword, logout } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validate')
const loginCheck = require('../../middlewares/loginCheck')


router.prefix('/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller
  ctx.body = await register({ userName, password, gender })
})
// 用户名是否已存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  //调用controller
  ctx.body = await isExist(userName)
})
// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // 调用controller 
  ctx.body = await login({ ctx, userName, password })
})

// 修改用户信息
router.post('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickname, city, picture, gender } = ctx.request.body
  // 调用controller
  debugger
  ctx.body = await changeInfo({ ctx, nickname, city, picture,gender })
})

// 修改密码
router.post('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  // 调用controller
  ctx.body = await changePassword({ ctx, password, newPassword })
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

module.exports = router
/**
 * @description user api 路由
 * @author zr
 */

const router = require('koa-router')()
const { isExist } = require('../../controller/user')

router.prefix('/api/user')
// 注册路由
router.get('/register', async (ctx, next) => {
  ctx.body = '测试数据'
})

// 用户名是否已存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.query
  //调用controller
  ctx.body = await isExist(userName)
})

module.exports = router
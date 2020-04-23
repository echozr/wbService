const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session =require('koa-generic-session')
const redisStore=require('koa-redis')
// const cors = require('koa2-cors') // 跨域配置
const {RedisConfig}=require('./config/db')
const {SESSION_KEY}=require('./config/constant') //session 秘钥
// 路由
const index = require('./routes/index')
const userApi = require('./routes/api/user')
// error handler
onerror(app)
// middlewares 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// 跨域配置
// app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
//   if (ctx.method == 'OPTIONS') {
//     ctx.body = 200
//   } else {
//     await next()
//   }
// })

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
//session 配置 
app.keys=[SESSION_KEY]
app.proxy
app.use(session({
  key:'weibo.sid', //cookie name  默认是koa.sid
  prefix:'weibeo:sess:', //redis key 的前缀，默认是 `koa:sess:`
  cookie:{
    path:'/',
    httpOnly:true,  //只允许服务端修改
    maxAge:24*60*60*1000 //ms 过期时间1天
  },
  store:new redisStore({
    all:`${RedisConfig.host}:${RedisConfig.port}`
  })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes 注册
app.use(index.routes(), index.allowedMethods())
app.use(userApi.routes(), userApi.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app

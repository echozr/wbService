/**
 * @description utils api 路由
 * @author zr
 */

const router = require('koa-router')()
const loginCheck = require('../../middlewares/loginCheck')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/utils')

// 上传图片
const options = {
  keepExtensions: true
}
router.post('/upload', loginCheck,koaForm(options), async (ctx, next) => {
  const File =  ctx.req.files.feil
  const { size, path, name, type } = File
  // 调用controller
  ctx.body = await saveFile(ctx,{
    name, type, size, filePath: path
  })
}) 


module.exports = router
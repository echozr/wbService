/**
 * @description json schema 验证中间件
 * @author zr
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
 * 生成 json schema 验证的中间件
 * @param {function} ValidateFn  验证函数
 */
function genValidator(ValidateFn) {
  //定义中间件函数
  async function validator(ctx, next) {
    //校验
    const data = ctx.request.query
    const error = ValidateFn(data)
    if (error) {
      //验证失败
      jsonSchemaFileInfo.message=error.message
      return ctx.body = new ErrorModel(jsonSchemaFileInfo)
    }
    //验证成功 继续执行
    await next()
  }
  //返回中间件
  return validator
}
module.exports = {
  genValidator
}
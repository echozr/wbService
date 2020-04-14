/**
 * @description json schema 执行校验
 * @author zr
 */
const Ajv = require('ajv')
const ajv=new Ajv({
  //allErrors: true //输出所有的错误 （比较慢）
})
/**
 * json schema 校验
 * @param {object} schema  json schema 规则
 * @param {object} data  待校验数据
 */
function validate(schema={}, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports=validate
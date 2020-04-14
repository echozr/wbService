/**
 * @description user 数据格式校验
 * @author zr
 */

const validate = require('./_validate')
// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$', // 用户名必须是6-10位之间的字母
      maxLength: 255,
      minLength: 6
    },
    password: {
      type: 'string',
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$', //最少6位,最多16位，至少1个大写字母，1个小写字母和1个数字
      maxLength: 255,
      minLength: 6
    },
    newPassword: {
      type: 'string',
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$', //最少6位,最多16位，至少1个大写字母，1个小写字母和1个数字
      maxLength: 255,
      minLength: 6
    },
    nickname: {
      type: 'string',
      maxLength: 255
    },
    picture: {
      type: 'string',
      maxLength: 255
    },
    city: {
      type: 'string',
      maxLength: 255,
      minLength: 2
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3
    }
  }
}

/**
 * 校验用户数据格式 执行校验
 * @param {object} data 用户数据
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidate
/**
 * @description 点赞的数据模型
 * @author zr
 */

const seq = require('../seq')
const { INTEGER } = require('../type')
const praise = seq.define('praise', {
  userId:{
    type:INTEGER,
    allowNull:false,
    comments:'用户id'
  },
  blogId:{
    type:INTEGER,
    allowNull:false,
    comments:'博客id'
  }

})

module.exports = praise

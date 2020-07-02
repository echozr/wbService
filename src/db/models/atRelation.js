/**
 * @description atMe的数据模型
 * @author zr
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN,STRING } = require('../type')


const atRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户Id'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '博客ID'
  },
  discussId: {
    type: INTEGER,
    comment: '评论ID'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读'
  },
  type:{
    type:STRING,
    allowNull:false,
    comment:'at的类型'
  }
})
module.exports = atRelation
/**
 * @description  评论相关的模型
 * @author zr
 */

const seq = require('../seq')
const { INTEGER, TEXT } = require('../type')

const Discuss = seq.define('discuss', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '博客ID'
  },
  parentId: {
    type: INTEGER,
    allowNull: false,
    comment: '父及评论ID，若是顶层评论为-1'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment:'评论内容'
  }
})

module.exports=Discuss
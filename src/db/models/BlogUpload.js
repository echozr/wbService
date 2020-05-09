/**
 * @description 微博相关的图片模型
 * @author zr
 */
const seq = require('../seq')
const { STRING, INTEGER } = require('../type')

const BlogUpload = seq.define('blogUpload', {
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '博客ID'
  },
  image: {
    type: STRING,
    comment: '博客图片'
  }

})

module.exports = BlogUpload
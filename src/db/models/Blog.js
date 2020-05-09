/**
 * @description 微博数据模型
 * @author zr
 */
const seq=require('../seq')
const {INTEGER,TEXT} =require('../type')

const Blog=seq.define('blog',{
  userId:{
    type:INTEGER,
    allowNull:false,
    comment:'用户ID'
  },
  content:{
    type:TEXT,
    allowNull:false,
    comment:'微博内容'
  }

})

module.exports=Blog
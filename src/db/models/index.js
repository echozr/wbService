/**
 * @description 数据模型入口文件
 * @author zr
 */

const User=require('./User')
const Blog=require('./Blog')
const BlogUpload=require('./BlogUpload')

// 外键关系

Blog.belongsTo(User,{
  foreignKey:'userId'
})

Blog.hasMany(BlogUpload,{
  foreignKey:'blogId'
})

module.exports={
  User,
  Blog,
  BlogUpload
}
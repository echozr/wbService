/**
 * @description 数据模型入口文件
 * @author zr
 */

const User = require('./User')
const Blog = require('./Blog')
const BlogUpload = require('./BlogUpload')
const UserRelation = require('./UserRelation')
const Praise = require('./Praise')
const Discuss = require('./discuss')
const AtRelation = require('./atRelation')

// 外键关系

//博客-属于用户
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

//博客有多张图片
Blog.hasMany(BlogUpload, {
  foreignKey: 'blogId'
})

// 博客有多个赞
Praise.belongsTo(User, {
  foreignKey: 'userId'
})

Blog.hasMany(Praise, {
  foreignKey: 'blogId'
})

//被关注入--可以查询到关注他的用户
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})


Blog.hasMany(Discuss, {
  foreignKey: 'blogId'
})

Discuss.belongsTo(User, {
  foreignKey: 'userId'
})

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

AtRelation.belongsTo(Blog, {
  foreignKey: 'blogId'
})

Discuss.hasMany(AtRelation, {
  foreignKey: 'discussId'
})
module.exports = {
  User,
  Blog,
  BlogUpload,
  UserRelation,
  Praise,
  Discuss,
  AtRelation
}
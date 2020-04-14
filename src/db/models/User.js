/**
 * @description 用户数据模型
 * @author zr
 */

const seq=require('../seq')
const {STRING,DECIMAL,BOOLEAN} =require('../type')
// 创建数据表 users
const user=seq.define('user',{
  userName:{
    type:STRING,
    allowNull:false,
    unique:true, //是否唯一项
    comment:'用户名唯一'
  },
  password:{
    type:STRING,
    allowNull:false,
    comment:'密码'
  },
  nickname:{
    type:STRING,
    allowNull:false,
    comment:'昵称'
  },
  gender:{
    type:DECIMAL,
    allowNull:false,
    defaultValue:3, //默认值
    comment:'性别(1:男性、2：女性、3：保密'
  },
  picture:{
    type:STRING,
    comment:'头像存图片地址'
  },
  city:{
    type:STRING,
    comment:'城市地址'
  }
})

module.exports=user 
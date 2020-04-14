/**
 * @description sequelize 同步数据库
 * @author zr
 */
const seq = require('./seq')
require ('./models/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('连接成功')
}).catch(() => {
  console.log('连接失败')
})

// 执行同步
seq.sync({force:true}).then(()=>{
  console.log('同步成功')
  process.exit()
})
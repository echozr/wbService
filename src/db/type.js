/**
 * @description 封装sequelize 数据类型
 * @author zr
 */

const sequelize=require('sequelize')
module.exports={
  STRING:sequelize.STRING,
  DECIMAL:sequelize.DECIMAL,
  TEXT:sequelize.TEXT,
  INTEGER:sequelize.INTEGER,
  BOOLEAN:sequelize.BOOLEAN           
}
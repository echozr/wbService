/**
 * @description utils controller
 * @author zr
 */
const path = require('path')
const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const errorInfo = require('../model/ErrorInfo')

// 文件最大体积
const MIX_SIZE = 1024 * 1024 * 1024 //  1M

// 存储文件目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 判断时候需要穿件存储图片的目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if(!exist){
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})



/**
 * 保存文件
 * @param {string} name 文件名称 
 * @param {string} type 文件类型
 * @param {number} size 文件大小
 * @param {string} filePath 存放路径
 */
async function saveFile(ctx,{ name, type, size, filePath }) {
  // 判断文件是否超过设置的最大文件\
  debugger
  if (size > MIX_SIZE) {
    //删掉文件 防治占用系统资源大小
    await fse.remove(filePath)
    return ErrorModel(errorInfo.uploadFileSizeFailInfo)
  }
  // 移动文件到指定的目录下
  const fileName = Date.now() + '.' + name //防止重名，名称前加随机时间戳
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)
  // 返回数据信息
  const url=ctx.request.header.host
  return new SuccessModel({
    url:`http://${url}/${fileName}`
  })
}

module.exports = {
  saveFile
}
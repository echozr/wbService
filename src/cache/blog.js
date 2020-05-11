/**
 * @description 微博缓存数据
 * @author zr
 */

const { get, set } = require('./_redis')
const { getList } = require('../services/blog')

//设置redis_key
const KEY_PREFIX = 'weibo:square:'

/**
 * 
 * @param {number} pageIndex  pageIndex
 * @param {number} pagesize  pagesize
 */
async function getSquareCacheList(pageIndex, pagesize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pagesize}`
  // 获取缓存
  const cacheResult=await get(key)
  if(cacheResult!=null){
    //获取缓存成功
    return cacheResult
  }
  //获取缓存失败,读取数据库
  const result=await getList({pageIndex,pagesize})
  // 设置缓存
  set(key,result,60)
  return result
}

module.exports = {
  getSquareCacheList
}

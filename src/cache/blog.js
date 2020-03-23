/**
 * @description 微博缓存层
 * @author 綦旭
 */

const {get,set} = require('./_redis')
const {getBlogListByUser} = require('../services/blog')
const KEY_PREFIX = 'weibo:sequare'
/**
 * 
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCacheList(pageIndex,pageSize){
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    // 尝试从缓存中读取
    const cacheResult = await get(key)
    if(cacheResult != null){
        // 获取缓存成功
        return cacheResult
    }

    // 没有缓存，则读取数据库
    const result = await getBlogListByUser({pageIndex,pageSize})
    // 设置  1min 过期时间
    set(key,result,60)
    return result
}
module.exports = {
    getSquareCacheList
}
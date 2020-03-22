/**
 * @description 数据格式化
 * @author qixu
 */
const {DEFAULT_PICTURE} = require('../conf/constant')
const { timeFormat } = require('../utils/dt')
function _formatUserPicture(obj){
    if(obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}
/**
 * 格式化数据时间
 * @param {Object} obj 数据 
 */
function _formatDBTime(obj){
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}
/**
 * 格式化用户信息
 * @param {Array|Object} list 
 */
function formatUser(list){
    if(list == null){
        return list
    }
    if(list instanceof Array){
        // 数组 用户列表
        return list.map(_formatUserPicture)
    }
    // 单个对象
    return _formatUserPicture(list)   
}
/**
 * 格式化微博 时间
 * @param {Array|Object} list 微博列表或者是单个微博对象
 */
function formatBlog(list){
    if(!list){
        return list
    }
    if(list instanceof Array){
        return list.map(_formatDBTime)
    }
    return _formatDBTime(list)
}
module.exports = {
    formatUser,
    formatBlog
}
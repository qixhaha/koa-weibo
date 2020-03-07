/**
 * @description 链接redis 的方法 get set _ 下划线开头的文件
 * @author 綦旭
 */
const redis = require('redis')
const {REDIS_CONF}  = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error',error=>{
    console.error('redis error',error)
})
/**
 * redis set 设置redis(redis只能存储字符串)
 * @param {string} key 键 
 * @param {string} val  值
 * @param {number} timeout 过期时间，单位是s
 */
function set(key,val,timeout = 60 * 60){
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key,val)
    // 设置过期时间
    redisClient.expire(key,timeout)
}
/**
 * redis get 获取redis的值
 * @param {string} key 
 */
function get(key){
    const promise = new Promise((resolve,reject)=>{
        redisClient.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
            if(val == null){
                resolve(null)
                return
            }
            try{
                resolve(JSON.parse(val))
            }catch(ex){
                resolve(val)
            }
        })
    })
    return promise
}
module.exports = {
    set,
    get
}
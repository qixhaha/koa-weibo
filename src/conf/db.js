/**
 * @description 存储配置 以及数据库的配置
 * @author 綦旭
 */
const {isProd} = require('../utils/env')
let REDIS_CONF = {
    port:6379,
    host:'127.0.0.1'
}
let MYSQL_CONF = {
    host:'47.93.53.196',
    user:'root',
    password:'123456',
    port:'',
    database:'koa2_weibo_db'
}
if(isProd){
    REDIS_CONF = {
        // 线上redis配置
        port:6379,
        host:'127.0.0.1'
    }
    let MYSQL_CONF = {
        host:'47.93.53.196',
        user:'root',
        password:'123456',
        port:'3306',
        database:'koa2_weibo_db'
    }
}
module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
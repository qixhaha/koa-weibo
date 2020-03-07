/**
 * @description 数据库的链接
 * @author 綦旭
 */
const Sequelize = require('sequelize')
const {MYSQL_CONF} =require('../conf/db')
const {host,user,password,database} = MYSQL_CONF
const {isProd,isTest} = require('../utils/env')
// 链接的配置
// define 解决插入中文报错的问题
const conf = {
    host,
    dialect:'mysql',
    define:{
        charset:'utf8',
        dialectOption:{
            collate:'utf8_general_ci',
        },
        timestamps:true
    }
}
// 测试环境不输出sql语句日志
if(isTest){
    conf.logging = () => {}
}
// 线上环境使用连接池
if(isProd){
    conf.pool = {
        max:5, // 连接池中最大的链接数量
        min:0,//最小
        idle:10000 // 如果一个连接池10s 之内没有被使用，则释放
    }
}
const seq = new Sequelize(database,user,password,conf)
//测试连接 
// seq.authenticate().then(()=>{
//     console.log('链接成功')
// }).catch((err)=>{
//     console.log('err',err)
// })
module.exports = seq
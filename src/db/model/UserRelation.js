/**
 * @description 微博  @ 用户的关系  数据模型
 * @author 綦旭
 */

const seq = require('../seq')
const {INTEGER} = require('../types')
const UserRelation = seq.define('userRelation',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'关注人id'
    },
    followerId:{
        type:INTEGER,
        allowNull:false,
        comment:'被关注人的id'
    }
})

module.exports = UserRelation
/**
 * @description 数据模型入口文件
 * @author qixu
 */
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
 
// 定义外键

Blog.belongsTo(User,{
    foreignKey:'userId'
})

UserRelation.belongsTo(User,{
    foreignKey:'followerId'
})
// 查询首页博客数据  （我关注的以及我自己的博客）
Blog.belongsTo(UserRelation,{
    foreignKey:"userId",
    targetKey:"followerId"
})
// 多对一 查询有多少人关注这个人了  通过userId这个外键
User.hasMany(UserRelation,{
    foreignKey:'userId'
})

module.exports = {
    User,
    Blog,
    UserRelation
}

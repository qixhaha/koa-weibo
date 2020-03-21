/**
 * @description 数据模型入口文件
 * @author qixu
 */
const User = require('./User')
const Blog = require('./Blog')
module.exports = {
    User,
    Blog
}

// 定义外键

Blog.belongsTo(User,{
    foreignKey:'userId'
})
/**
 * @description 微博 service
 * @author 綦旭
 */
const {Blog,User} = require('../db/model/index')
const {formatUser,formatBlog} = require('./_format')
async function createBlog({userId,content,image}){
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}
/**
 * 根据用户获取微博列表
 * @param {Object} param0  userName,pageIndex=0,pageSize=10
 */
async function getBlogListByUser({userName,pageIndex=0,pageSize=10}){
    // 拼接查询条件
    const userWhereOptions={}
    if(userName){
        userWhereOptions.userName = userName
    }

    // 执行查询
    let result = await Blog.findAndCountAll({
        limit:pageSize, // 查询的个数
        offset:pageSize*pageIndex, // 跳过几个
        order:[
            ['id','desc'] // 查询顺序
        ],
        // 链表查询
        include:[
            {
                model:User,
                attributes:['userName','nickName','picture'],
                where:userWhereOptions
            }
        ]
    }) 
    // result.count 总数，跟分页无关
    // result.rows 查询结果，数组
    let blogList = result.rows.map(row => row.dataValues)
    // 格式化
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem =>{
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    return {
        count:result.count,
        blogList
    }
}
module.exports = {
    createBlog,
    getBlogListByUser
}
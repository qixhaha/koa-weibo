/**
 * @description 首页  controller
 * @author 綦旭
 */
const {createBlog,getFollowersBlogList} = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')
const { createBlogFailInfo } = require('../model/ErrorInfo')
/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 */
async function create({userId,content,image}){
    try {
        const blog = await createBlog({
            userId,
            content,
            image
        }) 
        return new SuccessModel(blog)
    }catch(e){
        console.error(e.message, e.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}
/**
 * 获取首页微博列表
 * @param {number} userId 用户id 关注人id
 * @param {number} pageIndex  页数
 */
async function getHomeBlogList(userId,pageIndex = 0){
    let result = await getFollowersBlogList({
        userId,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    let {count,blogList} = result
    // 返回
    return new SuccessModel({
        isEmpty:blogList.length == 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}
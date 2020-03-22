/**
 * 个人主页
 * @description 个人主页 controller
 * @author 綦旭
 */
const {getBlogListByUser} = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * 获取个人主页的微博列表数据
 * @param {string} userName 用户名 
 * @param {number} pageIndex  当前页数
 */
async function getProfileBlogList(userName,pageIndex=0){
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const blogList = result.blogList
    // 拼接返回的数据
    return new SuccessModel({
        isEmpty:blogList.length == 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count:result.count
    })
}

module.exports = {
    getProfileBlogList
}
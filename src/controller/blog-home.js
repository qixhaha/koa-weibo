/**
 * @description 首页  controller
 * @author 綦旭
 */
const {createBlog} = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
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
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}



module.exports = {
    create
}
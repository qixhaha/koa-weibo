/**
 * @description 首页 api 路由
 * @author 綦旭
 */
const xss = require('xss')
const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const {create} = require('../../controller/blog-home')
router.prefix('/api/blog')
// 创建微博
router.post('/create',loginCheck,genValidator(blogValidate),async (ctx,next)=>{
    const {content,image} = ctx.request.body 
    const {id:userId} = ctx.session.userInfo
    ctx.body = await create({
        userId,
        content:xss(content),
        image
    })
})

module.exports = router
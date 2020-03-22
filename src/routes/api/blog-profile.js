// 加载更多
 

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')
router.get('/loadMore/:userName/:pageIndex',loginCheck,async (ctx,next)=>{
    console.log('params',ctx.params)
    let {userName,pageIndex} = ctx.params
    pageIndex= parseInt(pageIndex)
    const result = await getProfileBlogList(userName,pageIndex)
    // const {id:userId} = ctx.session.userInfo
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router
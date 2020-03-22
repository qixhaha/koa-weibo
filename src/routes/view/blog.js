/**
 * @description 微博view  路由
 * @author 綦旭
 */
const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
const {getProfileBlogList} = require('../../controller/blog-profile')
router.get('/',loginRedirect,async (ctx,next)=>{
    await ctx.render('index')
})

// 个人主页
router.get('/profile/:userName',loginRedirect,async (ctx,next)=>{

    // 已登录用户信息
    let myUserInfo = ctx.session.userInfo
    let myUserName = myUserInfo.userName

    let curUserInfo
    let {userName:curUserName} = ctx.params
    const isMe = curUserName == myUserName
    if(isMe){
        // 是当前用户
        curUserInfo = myUserInfo
    }else{
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if(existResult.errno !== 0){
            return 
        }
        curUserInfo = existResult.data
    }
    const result = await getProfileBlogList(curUserName,0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data
    console.log('数据为',  {blogData:{
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    }})
    await ctx.render('profile',{
        blogData:{
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData:{
            userInfo:curUserInfo,
            isMe
        }
    })
})
module.exports = router
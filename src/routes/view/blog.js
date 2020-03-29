/**
 * @description 微博view  路由
 * @author 綦旭
 */
const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
const {getProfileBlogList} = require('../../controller/blog-profile')
const { getFans,getFollowers } = require('../../controller/user-relation')
const {getSquareBlogList} = require('../../controller/blog-square')
router.get('/',loginRedirect,async (ctx,next)=>{
    await ctx.render('index')
})
// 个人主页
router.get('/profile',loginRedirect,async (ctx,next)=>{
    const {userName} = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
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
    //获取第一页数据 
    const result = await getProfileBlogList(curUserName,0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝数量
    const  fansResult = await getFans(curUserInfo.id)
    const {count:fansCount,fansList} = fansResult.data
  
    // 获取该人关注的列表
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, followersList } = followersResult.data
    // 判断是否关注了此人
    const amIFollowed = fansList.some(item=>{
        return item.userName == myUserName
    })
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
            isMe,
            fansData:{
                count:fansCount,
                list:fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed
        }
    })
})


// 广场页面

router.get('/square',loginRedirect,async (ctx,next)=>{
    // 获取微博数据  第一页
    const result =  await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})
module.exports = router
const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
/**
 * 获取登录信息的
 * @param {Object} ctx ctx对象 
 */
function getLoginInfo(ctx){
    let data = {
        isLogin:false
    }
    let userInfo = ctx.session.userInfo
    if(ctx.session && userInfo){
        data = {
            isLogin:true,
            userName:userInfo.userName
        }
    }
    return data
}
router.get('/login',async( ctx,next)=>{
    await ctx.render('login',getLoginInfo(ctx))
})
router.get('/register',async (ctx,next) =>{
    await ctx.render('register',getLoginInfo(ctx))
})
router.get('/setting',loginRedirect,async(ctx,next)=>{
    await ctx.render('setting',ctx.session.userInfo)
})
// 用户设置  （包括修改个人信息  密码  以及退出登录）
module.exports = router
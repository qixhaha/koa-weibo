const router = require('koa-router')()
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
module.exports = router
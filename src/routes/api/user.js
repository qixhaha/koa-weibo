/**
 * @description user API 路由
 * @author qixu
 */
const router = require('koa-router')()
const {isExist,register,login,deleteCurUser,changeInfo,changePassword,logout} = require('../../controller/user')
const userValidate = require('../../validator/user')
const {isTest} = require('../../utils/env')
const {loginCheck} = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
router.prefix('/api/user')
// 注册路由
router.post('/register',genValidator(userValidate),async (ctx,next)=>{
    const {userName,password,gender} = ctx.request.body
    // ctx.
    ctx.body = await register({
        userName,
        password,
        gender
    })
})
// 登录路由
router.post('/login',async(ctx,next)=>{
    let {userName,password} = ctx.request.body
    ctx.body = await login(ctx,userName,password)
    console.log('头部',ctx.headers)
})
// 用户名是否存在
router.post('/isExist',async (ctx,next) =>{
    const {userName} = ctx.request.body
    ctx.body = await isExist(userName)
})  
// 删除用户  但是仅限于在测试环境中删除自己登陆的用户 登陆的话才可以获得session里面的用户名
router.post('/delete',loginCheck,async(ctx,next)=>{
    if(isTest){
        const {userName} = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})
// 修改个人信息
router.patch('/changeInfo',loginCheck,genValidator(userValidate),async(ctx,next)=>{
    const {nickName,city,picture} =  ctx.request.body
    ctx.body = await changeInfo(ctx,{nickName,city,picture})
})
// 修改密码
router.patch('/changePassword',loginCheck,genValidator(userValidate),async(ctx,next)=>{
    const {password,newPassword} = ctx.request.body
    console.log('密码新密码',password,newPassword)
    const {userName} = ctx.session.userInfo
    ctx.body = await changePassword(userName,password,newPassword)
}) 
router.post('/logout',loginCheck,async (ctx,next)=>{
    ctx.body = await logout(ctx)
})
module.exports = router
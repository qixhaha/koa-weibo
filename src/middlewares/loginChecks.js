// 判断登陆的中间键一般有两种一个是判断页面的中间件 当访问这个页面路由的时候判断这个页面是否登录如果没有登录页面直接跳转到登录页面 第二种是判断api的中间件 访问api的时候一般都先访问是否登录中间件如果没有登录直接 返回错误信息表示没有获取到登录信息 这时候不返回到别的页面

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')
/**
 * api 登录验证
 * @param {Object} ctx ctx 对象 
 * @param {function} next  next函数
 */
async function loginCheck(ctx,next){
    if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}
/**
 * 页面登录验证
 * @param {Object} ctx ctx 对象
 * @param {function} next next 函数 
 */
async function  loginRedirect(ctx,next) {
    if(ctx.session && ctx.session.userInfo){
        await next()
        return 
    }
    const curUrl = ctx.url
    ctx.redirect(`/login?url=`+encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}
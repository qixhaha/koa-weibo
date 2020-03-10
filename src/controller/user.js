/**
 * @description user controller
 * @author qixu
 */
const {getUserInfo,createUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo,registerUserNameExistInfo,registerFailInfo,loginFailInfo} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 * 用户名称是否存在
 * @param {String} userName 
 */
async function isExist(userName){
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        return new SuccessModel(userInfo)
    }else{
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}
/**
 * 
 * @param {string} userName  用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男 2 女 3保密）
 */
async function register({userName,password,gender}){
    // 第一步判断是否有这个人
    let userInfo = await getUserInfo(userName)
    if(userInfo){
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({userName,password:doCrypto(password),gender})
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message,ex.stack)
        return new ErrorModel(registerFailInfo)
    }

}
/**
 * 用户登录逻辑函数
 * @param {Object} ctx ctx对象 
 * @param {string} userName 用户名 
 * @param {string} password 密码 
 */
async function login(ctx,userName,password){
    let userInfo = await getUserInfo(userName,doCrypto(password))
    console.log('加密密码为',doCrypto(password))
    if(!userInfo){
        return new ErrorModel(loginFailInfo)
    }
    // 如果有这个人的话 将这个人的信息存储在session中 （session存在redis中服务端返回cookie值）
    if(!ctx.session.userInfo){
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}
module.exports = {
    isExist,
    register,
    login
}
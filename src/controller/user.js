/**
 * @description user controller
 * @author qixu
 */
const {getUserInfo,createUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo,registerUserNameExistInfo,registerFailInfo} = require('../model/ErrorInfo')
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
module.exports = {
    isExist,
    register
}
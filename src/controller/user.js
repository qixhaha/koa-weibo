/**
 * @description user controller
 * @author qixu
 */
const {getUserInfo} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo} = require('../model/ErrorInfo')
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
module.exports = {
    isExist
}
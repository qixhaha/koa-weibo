/**
 * @description user controller
 * @author qixu
 */
const {getUserInfo,createUser,deleteUser,updateUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo,registerUserNameExistInfo,registerFailInfo,loginFailInfo,deleteUserFailInfo,changeInfoFailInfo,changePasswordFailInfo} = require('../model/ErrorInfo')
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
    // console.log('加密密码为',doCrypto(password))
    if(!userInfo){
        return new ErrorModel(loginFailInfo)
    }
    // 如果有这个人的话 将这个人的信息存储在session中 （session存在redis中服务端返回cookie值）
    if(!ctx.session.userInfo){
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}
/**
 * 删除当前用户
 * @param {string} userName 删除当前用户 
 */
async function deleteCurUser(userName){
    const result = await deleteUser(userName)
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}
/**
 * 
 * @param {Object} ctx ctx 
 * @param {string} nickName 用户名 城市  照片 
 */
async function changeInfo(ctx,{nickName,city,picture}){
    let {userName} = ctx.session.userInfo
    if(!nickName){
        nickName = userName
    }
    const result = await updateUser({
        newNickName:nickName,
        newCity:city,
        newPicture:picture
    },{
        userName
    })
    if(result){
        Object.assign(ctx.session.userInfo,{
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)
}
/**
 * 
 * @param {string} userName  用户名
 * @param {string} password 密码
 * @param {string} newPassword 新密码 
 */
async function changePassword(userName,password,newPassword){
    const result = await updateUser({
        newPassword:doCrypto(newPassword)
    },{
        userName,
        password:doCrypto(password)
    })
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}
/**
 * 推出的登陆
 * @param {Object} ctx 
 */
function logout(ctx){
    delete ctx.session.userInfo
    return new SuccessModel()
}
module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}
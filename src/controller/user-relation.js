/**
 * @description 用户关注  关系 controller
 * @author 綦旭
 */
const {getUsersByFollower,  addFollower,
    deleteFollower,getFollowersByUser} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

/**
 * 根据用户id获取粉丝列表  被关注人的id
 * @param {number} userId 用户ID 
 */
async function  getFans(userId){
    const {count,userList} = await getUsersByFollower(userId)
    return new SuccessModel({
        count,
        fansList:userList
    })
}
/**
 * 获取关注人列表
 * @param {number} userId 关注人id 
 */
async function getFollowers(userId){
    const { count, userList } = await getFollowersByUser(userId)

    return new SuccessModel({
        count,
        followersList: userList
    })
}
/**
 * 关注
 * @param {number} myUserId 当前登录的用户id 
 * @param {number} curUserId 要被关注的用户id
 */
async function follow(myUserId,curUserId){
    try {
        await addFollower(myUserId,curUserId)
        return new SuccessModel()
    } catch (err) {
        console.error(err)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId,curUserId){
    const Result = await deleteFollower(myUserId,curUserId)
    if(Result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}
module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}
/**
 * @description user service
 * @author qixu
 */
const {User} = require('../db/model/index')
const {formatUser} = require('./_format')
/**
 * 获取用户信息 (可能用在)
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName,password){
    // 查询条件
    const whereOpt = {
        userName
    }
    if(password){
        Object.assign(whereOpt,{password})
    }
    // 查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where:whereOpt
    })
    if(result == null){
        // 未找到
        return result
    }
    
    // 格式化
    const formatRes = formatUser(result.dataValues)
    console.log('查询的结果',formatRes,result.dataValues)
    return formatRes

}

/**
 * 
 * @param {string} userName  用户名
 * @param {string} password 密码
 * @param {number} gender  用户性别
 * @param {string} nickNaem  别名
 */
async function createUser({userName,password,gender = 3,nickName}){
    const result = User.create({
        userName,
        password,
        nickName:nickName || userName,
        gender
    })
    const data = result.dataValues
    return data
}
/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // 修改的行数
}
/**
 * 删除用户
 * @param {string} userName 
 */
function deleteUser(userName){
    const result = User.destroy({
        where:{
            userName
        }
    })
    return result > 1
}
module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}
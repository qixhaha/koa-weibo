/**
 * 生成json schema 验证的中间件
 * @param {function} validateFn  验证函数
 */
const { ErrorModel } = require('../model/ResModel')
function genValidator(validateFn){
    // 定义中间件
    async function validator(ctx,next){
        const data = ctx.request.body
        const error = validateFn(data)
        if(error){
            ctx.body = new ErrorModel({
                errno:404,
                message:error
            })
            return
        }
        // 验证成功
        await next()
    }
    return validator
}
module.exports = {
    genValidator
}
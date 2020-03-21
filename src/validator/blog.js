/**
 * @description 微博 数据格式校验
 * @author 綦旭
 */
const validate = require('./_validate')

// 检验规则
const SCHEMA = {
    type:'object',
    properties:{
        content:{
            type:'string'
        },
        image:{
            type:'string',
            maxLength:255
        }
    }
}
/**
 * 检验微博数据格式
 * @param {Object} data 微博数据
 */
function  blogValidate(data={}){
    return validate(SCHEMA,data)
}
module.exports = blogValidate
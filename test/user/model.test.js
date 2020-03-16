/**
 * @description user model test
 * @author 綦旭
 */

const {User} = require('../../src/db/model/index')
test('User 模型的各个属性测试',()=>{
    const user = User.build({
        userName:'张三',
        password:'121212dfdfdf',
        nickName:'张三',
        picture:'/xxx.png',
        city:'北京'
    })
    // 验证各个属性
    expect(user.userName).toBe('张三')
    expect(user.password).toBe('121212dfdfdf')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3) // 测试 gender 默认值
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('北京')
})
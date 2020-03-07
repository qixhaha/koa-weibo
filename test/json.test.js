/**
 * @description json test
 * @author 綦旭
 */
const server = require('./server')
test('json接口数据返回的格式正确',async()=>{
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title:'koa2 json'
    })
})
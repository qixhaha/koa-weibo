/**
 * @description user api test
 * @author 綦旭
 */

const server = require('../server')
// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// 存储的cookie  因为删除的时候需要登录才能删除 所以调用删除接口的时候需要携带着当前对的cookie值
 
// 存储 cookie
let COOKIE = ''
//第一步先注册
test('注册一个用户，应该成功',async()=>{
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

// 第二部验证重复注册

test('重复注册用户，应该失败',async()=>{
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})


// 第三部查询改用户是否存在
test('查询注册的用户，应该存在',async()=>{
    const res = await server.post('/api/user/isExist').send({userName})
    expect(res.body.errno).toBe(0)
})

// 第四部 json schema 检测 验证注册用户侧格式是否正确

test('json schema 检测，非法格式，注册应该失败',async()=>{
    const res = await server.post('/api/user/register').send({
        userName:'123',
        password:'1',
        gender:'mail'
    })
    expect(res.body.erron).not.toBe(0)
})


// 登录  这时候要记录当前的cookies值
test('登录，银海成功',async()=>{
    let res = await server.post('/api/user/login').send({
        userName,
        password
    })
    expect(res.body.errno).toBe(0)
    // let  resCookie = res.headers['set-cookie'] 
    const resCookie = res.headers['set-cookie'].join(';')
    const str1 = resCookie.match(/weibo.sid=(\S*);\s/)[0]
    const str2 = resCookie.match(/weibo.sid.sig=(\S*);\s/)[0]
    console.log('str1',str1)
    console.log('str12',str2)
    COOKIE = str1 + str2
})
// 删除该用户

test('删除用户应该成功',async()=>{
    const res = await server.post('/api/user/delete').set('cookie',COOKIE)
    expect(res.body.errno).toBe(0)
})
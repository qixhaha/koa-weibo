// 创建异步链接
const seq = require('./seq')
// require('./model');
seq.authenticate().then(() => {
    console.log('链接成功')
}).catch((err) => {
    console.log('err', err)
})
//执行同步  如果有这个表格先强制删除在创建
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    // 链接成功以后强制退出
    process.exit()
})
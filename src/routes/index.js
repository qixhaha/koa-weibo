const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    // console.log('session',ctx.session);

    await ctx.render('index', {
        title: 'Hello Koa 2!',
        isMe: true,
        // viewNum,
        blogList: [
            {
                id: 1,
                title: 'aaaa'
            }, {
                id: 2,
                title: 'bbbb'
            }, {
                id: 3,
                title: 'cccc'
            }
        ]
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    // debugger
    // console.log(ctx.session)
    // const session = ctx.session
    // if(session.viewNum == null){
    //   session.viewNum = 0;
    // } 
    //   session.viewNum++;
    //   console.log(ctx.session.viewNum)
    ctx.body = {
        title: 'koa2 json',
    // viewNum: session.viewNum
    // viewNum:session.viewNum
    }
})

module.exports = router

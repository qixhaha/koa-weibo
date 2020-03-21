/**
 * @description 微博view  路由
 * @author 綦旭
 */
const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginChecks')
router.get('/',loginRedirect,async (ctx,next)=>{
    await ctx.render('index')
})
module.exports = router
var router = require('koa-router')();

router.prefix('/news');

router.get('/', async (ctx,next)=>{  //get请求
    await ctx.render('./news/index'); //渲染art-template模板  
});

module.exports = router;
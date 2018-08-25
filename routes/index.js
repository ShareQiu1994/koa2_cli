var router = require('koa-router')();

router.get('/', async (ctx,next)=>{  //get请求
     await ctx.render('./index'); //渲染art-template模板  
});

router.get('/about', async (ctx,next)=>{  //get请求
     await ctx.render('./about'); //渲染art-template模板  
});

module.exports = router;
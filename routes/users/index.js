var router = require('koa-router')();

router.prefix('/users');

router.get('/', async (ctx,next)=>{  //get请求
    await ctx.render('./users/index'); //渲染art-template模板  
})

router.get('/bar', async (ctx,next)=>{  //get请求
    await ctx.render('./users/bar/index'); //渲染art-template模板  
});

router.get('/bar/aaa',async (ctx,next)=>{  //get请求
   await ctx.render('./users/bar/aaa'); //渲染art-template模板  
});

module.exports = router;


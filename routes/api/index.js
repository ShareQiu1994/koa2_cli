var router = require('koa-router')();

router.get('/', async (ctx,next)=>{  //get请求
    await ctx.render('api/index'); //渲染art-template模板  
});

router.get('/get', async (ctx,next)=>{  //get请求
    ctx.body = [{
        title:'台风山竹席卷广东，最大风力18级',
        data:80
    },
    {
        title:'广东GDP今年有望突破万亿大关',
        data:50
    }];
});

router.get('/update', async (ctx,next)=>{  //get请求
    ctx.body = {
        title:'修改成功',
        numbe:1,
        status:200
    };
});

router.get('/delete', async (ctx,next)=>{  //get请求
    ctx.body = {
        title:'删除成功',
        numbe:1,
        status:200
    };
});

module.exports = router;
const router = require('koa-router')(); //引入路由 中间件  并实例化
const path = require('path'); //路径模块
const Db = require(path.join(path.resolve("."),'./module/db')); //引入封装好的 链接mongoDB的 模块  

// console.log(path.resolve(".")); 获取根路径 

router.prefix('/db');

//路由配置
router.get('/',async (ctx,next)=>{  //get请求
          let data = await Db.find('dmsfly',{});
          await ctx.render('./db/db',{data}); //渲染art-template模板  title为注入变量  
}).get('/add',async (ctx,next)=>{  //get请求 新增
          let add = await Db.insert('dmsfly',{"name":"大明山飞行路径123","time":new Date(),"data":Math.random().toString(36).substr(2)});
           ctx.redirect('/db') //跳转路由 
}).get('/remove',async (ctx,next)=>{  //get请求 删除
      let getDate = ctx.request.query;
      let remove = await Db.remove('dmsfly',{'_id':Db.getObjectID(getDate.id)}); 
       ctx.redirect('/db') //跳转路由 
}).get('/update',async (ctx,next)=>{  //get请求 修改
      let getDate = ctx.request.query;
      let update = await Db.update('dmsfly',{'_id':Db.getObjectID(getDate.id)},{"time":new Date(),"data":Math.random().toString(36).substr(2)}); 
       ctx.redirect('/db') //跳转路由 
})


module.exports =  router;
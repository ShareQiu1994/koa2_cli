const Mongodb = require('mongodb'); //引入mongodb模块
const MongoClient = Mongodb.MongoClient; //引入mongodb.MongoClient 模块 用于连接数据库
const ObjectID = Mongodb.ObjectID; //引入mongodb.ObjectID 模块 用于通过ID查询数据 

const config = require('./config.js');

class Db{
    
   //单例
   static init(){
        if(!Db.instance){ //单例
            Db.instance = new Db();
        }
        return Db.instance;
   }
   constructor(){
   	 this.dbClient = null; //放置 mongoDB链接对象
     this.connent(); //实例化的时候就连接mondb  屏蔽掉以后是调用查询方法的时候才去第一次链接mongodb 不屏蔽是默认服务器运行node的时候就 链接mongodb
   } 
   connent(){
	   	return new Promise((resolve,reject)=>{
	   		if(!this.dbClient){  //防止多次初始链接数据库
	   			MongoClient.connect(config.dburl,{useNewUrlParser: true },(err,client)=>{
			         if(err){
				     	reject(err);
				     	return;
				     }
				     console.log('已经链接上mongoDB数据库');
				     this.dbClient = client.db(config.dbName); //选择数据库
			         resolve(this.dbClient) //返回 mongoDB链接对象
			     });
	   		}else{
	   			resolve(this.dbClient) //返回 mongoDB链接对象
	   		}
	   	});
   }
   find(collectionName,json){ //查找数据
      return new Promise((resolve,reject)=>{
	      this.connent().then((db)=>{
	          let result = db.collection(collectionName).find(json);
	          // console.log(result);
	          result.toArray((err,docs)=>{
	               if(err){
                     reject(err);
			     	 return;
	               }
	               resolve(docs); 
	          });
	      });
      });
   }
   update(collectionName,oldJson,newJson){  //修改数据
   	   return new Promise((resolve,reject)=>{
	      this.connent().then((db)=>{
	          db.collection(collectionName).updateOne(oldJson,{
	          	 $set:newJson,
	          },(err,docs)=>{
	              if(err){
                     reject(err);
			     	 return;
	               }
	               resolve(docs); 
	          })
	      });
      });
   }
   insert(collectionName,json){ //新增数据
   	   return new Promise((resolve,reject)=>{
	      this.connent().then((db)=>{
	          let result = db.collection(collectionName).insertOne(json,(err,docs)=>{
	          	   if(err){
                     reject(err);
			     	 return;
	               }
	                resolve(docs); 
	          });
	      });
      });
   }
   remove(collectionName,json){ //删除数据
   	   return new Promise((resolve,reject)=>{
	      this.connent().then((db)=>{
	          let result = db.collection(collectionName).removeOne(json,(err,docs)=>{
	          	   if(err){
                     reject(err);
			     	 return;
	               }
	                resolve(docs); 
	          });
	      });
      });
   }
   getObjectID(id){ //将字符串ID转换成 mongoDb 识别的ObjectID 转换后可以通过ObjectId 进行数据精确查询
     return new ObjectID(id); //将字符串ID转换成 mongoDb 识别的ObjectID对象
   }
}
/*
  该链接方式是单例 长连接
  只有在第一次运行的时候 实例化一次 并值链接一次数据库 后面多次链接都是用的第一次的实例和链接 
 */
module.exports = Db.init();
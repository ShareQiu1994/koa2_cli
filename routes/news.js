const router = require('koa-router')();
router.prefix('/news');

const index=require('./news/index.js');

router.use(index.routes());  // 匹配 '/' 路由

module.exports = router;


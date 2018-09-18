const router = require('koa-router')();
router.prefix('/api');

const api=require('./api/index.js');

router.use(api.routes());  // 匹配 '/' 路由

module.exports = router;
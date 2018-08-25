var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'koa2cli',
  description: 'The nodejs.org example web server.',
  script: 'D:/koa2_cli/bin/www'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
 

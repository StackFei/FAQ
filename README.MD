
# webhook
由于上传的文件夹被屏蔽无法查看顾列出大致结构以及部分代码
目录结构
```
── poject
   ├── webhook   
   |   ├── webhooks.js
   |   ├── poject-server.sh
   |   └── poject-web.sh
   ├── poject-server
   |   ├── server.js  
   |   └── DockerFile
   ├── poject-web
   |   ├── web.js  
   |   └── DockerFile
```
 - webhook webhooks.js
```js
let http = require('http');
let crypto = require('crypto');
var spawn = require('child_process').spawn;
const SECRET = '123456';
function sign (data) {
  return 'sha1=' + crypto.createHmac('sha1', SECRET).update(data).digest('hex')
}
let server = http.createServer(function(req,res){
  console.log(req.method,req.url);
  if(req.url == '/webhook' && req.method =='POST'){
    let buffers = []; 
    req.on('data',function(data){
      buffers.push(data);
    });
    req.on('end',function(){
      let body = Buffer.concat(buffers);
      let sig   = req.headers['x-hub-signature'];
      let event = req.headers['x-github-event'];
      let id    = req.headers['x-github-delivery'];
      if(sig !== sign(body)){
        return res.end('Not Allowed');
      }
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify({"ok":true}));
      //===========开始部署ci/cd===================
      if(event === 'push'){
        let payload = JSON.parse(body);
        let child = spawn('sh', [`./${payload.repository.name}.sh`]);
        let buffers = [];
        child.stdout.on('data', function (buffer) { buffers.push(buffer)});
        child.stdout.on('end', function () {
          let logs = Buffer.concat(buffers).toString();
          console.log(logs)
        });
      }
    });
  }else{
    res.end('Not Found!');
  }
});
server.listen(4000,()=>{
  console.log('服务正在4000端口上启动!');
});
```
 - webhook poject-server.sh
```
#!/bin/bash
WORK_PATH='/usr/poject/object-server'
cd $WORK_PATH
echo "清理server代码"
git reset --hard origin/master
git clean -f
echo "拉取server最新代码"
git pull origin master
echo "开始构建镜像"
docker build -t object-server:1.0 .
echo "删除旧容器"
docker stop object-server-container
docker rm object-server-container
echo "启动新容器"
docker container run -p 3000:3000 -d --name object-server-container -d object-server:1.0
```
 - poject-server DockerFile
```
FROM node
LABEL name="object-server"
LABEL version="1.0"
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD npm start
```
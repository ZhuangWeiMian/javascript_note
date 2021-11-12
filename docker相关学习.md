## docker相关学习

### 常用操作

1. build

   xxx表示镜像名字 xx表示镜像版本

   ```
   docker build -t xxx:xx .
   ```

2. 启动进入bash

   ```
   docker run -it xxxx(镜像id) /bin/bash
   
   // 映射当前机器的端口
   docker run -dp xxx(主机端口):yyy(容器端口)
   // 加-d参数指明在后台程序启动容器，返回容器id
   ```

3. 导出文件

   ```
   // 先run起来
   docker run -it xxxx(镜像id) /bin/bash
   // 查看当前运行的container
   docker ps
   // 导出
   docker export xxxx(containerID)>xxxx.tar(导出的文件地址)
   // 解压
   tar -xvf xxxx.tar -C xxx(指定路径)
   
   ```

4. 删除镜像

   ```
   // 删除单个或多个镜像
   docker rmi xxxxx(镜像名):yyy(镜像tag)
   
   // 删除所有未被容器引用的镜像
   docker image prune -a
   ```

5. 删除容器

   ```
   // 删除所有容器
   docker rm $(docker ps -q)
   
   // 删除所有退出的容器
   docker container prune
   ```

6. 卷的概念，不同容器共享文件夹

   ```
   // 创建一个卷
   docker volume create xxx(卷名)
   // 使用卷, yyy为zzz中的镜像地址，会存储下来，其他容器共享的时候，执行同样的命令即可
   docker run -v xxx(卷名):yyy(镜像路径) zzzz(镜像id)
   // 清理所有无用卷
   docker volume prune
   ```


7. 绑定挂载，容器和主机共享目录

   ```
   docker run -v "xxx(主机目录):yy(容器目录)" zzz(镜像id)
   ```

8. 不同容器之间通信

   ```
   // 创建一个网络 --subnet中参数必填，否则会出现没有可分配的ip情况
   docker network create localdev --subnet v/24
   // a容器启动服务
   docker run --network xxx(网络名) -network-alias yyy(网络别名，启动服务的一方需要加，否则无法监听到) zzz(镜像id)
   // b服务请求a服务, 服务中有容器id作为host请求
   docker run --network xxx(网络名) yyy(镜像名) 
   ```

   

### docker网络逻辑



 	1. 不同docker容器之间如何保证网络一致。
 	  	1. 通过桥接与主机通信，通过使主机所在网络保持一致，使不同容器的网络保持一致
 	  	2. 主机能使不同子网的网络权限不一致吗？比如容器a和容器b的数据库权限怎么区分，主机对不同容器的权限是如何管控的
 	2. 容器之间相互通信是通过内部网络比如桥接还是外部http接口形式？
 	3. 一台机器上是否部署多个容器，不同容器之间的隔离是怎么做到的。多个不同的服务
 	4. 是否有可能一个机器部署多个相同的镜像
 	5. 

docker与k8s结合。在同一个podip中，不同的容器之前由于网桥docker0的缘故，网络是互通的，不同的pod之间，由于podIP是跟物理机器绑定的，网络也是跟物理机维持一致，因为如果物理机的网络互通，不同的pod之间网络也是互通的。

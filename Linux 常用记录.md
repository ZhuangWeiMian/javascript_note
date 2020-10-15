# Linux 常用记录

## 权限管理

#### ls 常用命令参数

-l

 <img src="/Users/anewzhuang/Library/Application Support/typora-user-images/image-20201003145040855.png" alt="image-20201003145040855" style="zoom:50%;" />

如果第一个字符是横线，表示是一个非目录的文件。如果是 d，表示是一个目录。

#### chown

将当前前目录下的所有文件与子目录的拥有者皆设为 runoob，群体的使用者 runoobgroup:

```
chown -R runoob:runoobgroup *
```



#### chmod

用于改变 linux 系统文件或目录的访问权限

每一文件或目录的访问权限都有三组,  属主、属主同组用户、系统中其他用户

```
u ：目录或者文件的当前的用户
g ：目录或者文件的当前的群组
o ：除了目录或者文件的当前用户或群组之外的用户或者群组
a ：所有的用户及群组
```

```
r ：读权限，用数字4表示
w ：写权限，用数字2表示
x ：执行权限，用数字1表示
```

`chmod 777 test.log`

这里三个数字代表三组用户，数字大小是叠加的结果，也可以通过

`chmod u+x test.log`代表修改当前用户+权限处理

#### head

显示 test1.log 文件中前 2 行

```
head -n 2 test1.log
```

显示最后2行

```
tail -n 2 test1.log
```



#### find



#### grep

```
-A n --after-context显示匹配字符后n行
-B n --before-context显示匹配字符前n行
-C n --context 显示匹配字符前后n行
-R 递归查找文件夹
```

`cat test.log | grep -f  -C 3`



#### du

查看使用空间

`du -hc -depth=1 code/`查看目录大小



#### tar

```
-c 建立新的压缩文件
-f 指定压缩文件
-t 显示压缩文件中的内容
```





#### lsof

`-i:n`查看对应的端口占用

`lsof -i:8080`



#### kill

`-9 pid`杀死对应pid的进程

`kill-9 12487`



#### cat

`cat > filename << EOF`创建文件，并输入

`cat > aaaa.log << EOF`



# Q

什么是软链接

硬链接相当于是索引，允许一个文件有多个有效路径名，避免误删情况。当文件有多个硬链接时，只有所有的链接都被删除，文件的数据块及目录才会被释放

软链接相当于是window的快捷方式，用一个文件来存储文件的位置信息，通过`ls -l filename`如果第一个字母是`l`,说明是软链接

```
[oracle@Linux]$ touch f1          #创建一个测试文件f1
[oracle@Linux]$ ln f1 f2          #创建f1的一个硬连接文件f2
[oracle@Linux]$ ln -s f1 f3       #创建f1的一个符号连接文件f3

[oracle@Linux]$ echo "I am f1 file" >>f1
[oracle@Linux]$ cat f1
I am f1 file
[oracle@Linux]$ cat f2
I am f1 file
[oracle@Linux]$ cat f3
I am f1 file
[oracle@Linux]$ rm -f f1
[oracle@Linux]$ cat f2
I am f1 file
[oracle@Linux]$ cat f3
cat: f3: No such file or directory
```

可以得到，硬链接相互之间独立，互删无影响，软链接对应的硬链接，软链接的内容失效




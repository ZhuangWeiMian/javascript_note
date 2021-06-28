## node 错误监控知识

[TOC]

### 前置JS基础知识

#### try catch

这是常用的错误处理手段

```
try {
	const a = {};
	a();
} catch(err) {
	console.log('try逻辑出现错误');
}
```

在try 中如果代码块发生错误，就会转到catch的逻辑。在这段代码块中，就会打印出catch里的逻辑。

但是，换一种情况看看呢

```
try {
	setTimeout(() => {
			const a = {};
			a();
	})
} catch(err) {
	console.log('try逻辑出现错误');
}
```

这种情况，就是我们常见的异步情况。在这种情况下，`catch`就无法捕获到`try`中出现的错误。

综上说明，`catch`只能捕获同步的错误，对于异步导致的错误情况，是无能为力的。

> 备注一下： 如果有finally的情况，则不管是走到try的逻辑，还是catch的逻辑，都会走到finally的逻辑。一种极端情况，你在try中进行了return 行为，在catch也进行了return，finally会自动忽略其return行为，进行自己的return值

```
function test() {
  try {
    return 1;
  } catch {
    return 2;
  } finally {
    return 3;
  }
}

test(); // 3
```



### 浏览器监控错误

`window.onerror`或者说`error`事件的`addEventListener`，就是我们常用的在window层面监听错误的监控。当错误未被捕获或者说正确处理的时候，就会抛出错误，停下当前宏任务的进行。

但是在未处理Promise的reject行为时，同样也会在控制台中抛出错误，而这里的捕获方式并不是监听error事件，而是监听`rejectionhandled`事件



### node层监控错误

因此，在捕获node错误的时候，我们可以联想一下js的捕获错误情况

1. `try catch`大法，同步错误的情况下，`try catch`大法好用
2. `process.on('uncaughtException')`如果代码逻辑中未捕获到的错误，最终会走到这里来，这里可以类似于window中的`error`事件, 在这种情况下，node的服务已经无法进行。
3. `process.on('unhandledRejection')` 这种情况是用于在promise的reject行为未进行处理，而走到reject行为的情况

因此，在我们需要做错误监控的时候，我们一般监控`uncaughtException`问题, 同时，如果自身意识到`try catch`逻辑处理时，为了维持应用的稳定性，应做`try catch`的应用逻辑，并在catch中进行上报。而对于`Promise`中被reject之后，没有对应的处理函数，也应该进行上报。



上述是错误监控时应该进行的处理逻辑，但同时，我们也应该在我们的代码中考虑各种错误处理的情况，避免走到最后错误未被捕获的情况（上述监控`uncaughtException`，`unhandleRejection`）

> 关于node 中异步错误捕获的实现，可以看看这篇文章 https://zhuanlan.zhihu.com/p/62210238



### 结合nestjs框架的监控

nestjs框架会自带异常处理逻辑，我们可以通过增加拦截器增加全局的http请求过滤器，将异步请求转为`async await`写法，同时使用`try catch`包裹其中的逻辑，就可以达到拦截的效果。具体为：

```}
// exception-interception.ts
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((err) => {
                    const request = context.switchToHttp().getRequest();
                    console.error(err, '=======err');
                    reportError({ log: err.stack, req: request }); // 上报错误
                    return throwError(new HttpException('页面发生错误', 500))
                }),
            );
    }
}

// app.controller.ts

@UseInterceptors(new ErrorsInterceptor())
@Controller('**')
export class AppController {}
```

这里可以进行业务侧监控，同时，增加对`uncaughtException`，`unhandleRejection`情况的监听，进行错误上报

```
process.on('unhandledRejection', err => {
    console.log('err', err, 'unhandledRejection');
    reportError(err); // 上报错误
  })
  process.on('uncaughtException', err => {
    console.error('有一个未捕获的错误', err);
    reportError(err); // 上报错误
    process.exit(1) //强制性的（根据 Node.js 文档）
  });
```



### 错误处理

因此，我们在自身的业务逻辑中，为避免走到最后的无法回头的情况，应尽量在业务中关注，并进行处理。

1. 判断，包括类型判断和返回值的判断，关注io操作过程的错误处理
2. JavaScript 的 `throw` 机制的任何使用都会引起异常，异常必须使用 `try…catch` 处理，否则 Node.js 进程会立即退出。

3. 正确处理`Promise`的reject行为


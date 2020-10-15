## JavaScript尾递归

### 背景

- 不同浏览器的最大栈值不一致，万级别
- 函数执行一次就会把函数推入栈内，不断入栈出栈
- 在递归中，就会出现大量入栈的操作，容易造成栈溢出

### 递归方案

```
function recursion(n) {
    if (n <= 1) return 1;
    return n + recursion(n-1);
}
```

在这种情况下，这里的每调用一次，就需要先计算`recursion(n-1)`,然后计算 `n+recursion(n-1)`的值，

假设输入为5， 计算过程

```
5 + recursion(4)
4 + recursion(3)
3 + recursion(3)
2 + recursion(1)
1
```

保存的调用栈为n,复杂度为O(n)

### 尾递归方案

```
function recursion(n, rest=0) {
    if (n <= 1) return n+rest;
    return recursion(n-1, rest+n);
}
```

在这种情况下，这里的每调用一次，内部已执行的`rest+n`和`n-1`,处理完后就马上出栈了。抽象来看其实相当于只执行了一次入栈行为。以5举例

```
recursion(5, 1)
recursion(4, 5)
recursion(3, 9)
recursion(2, 12)
recursion(1, 14)
```

这里只保留了一个调用栈，复杂度为O(1). 



这里其实涉及到**尾调用优化**（编译器实现）的问题，这是因为，不需要保存内部的变量和调用位置，因此这里可以直接把内层函数的调用直接替代外层函数的调用记录。

> ES6的严格模式才能使用，因为正常模式下，函数内部有两个变量，用来跟踪函数的调用栈
>
> Arguments: 返回调用时函数的参数
>
> Func.caller: 返回调用当前函数的那个函数


## JavaScript尾递归

### 背景

- 不同浏览器的最大栈值不一致，万级别
- 函数执行一次就会把函数推入栈内，不断入栈出栈
- 在递归中，就会出现大量入栈的操作，容易造成堆栈溢出

### 递归方案

```
function recursion(n) {
    if (n <= 1) return 1;
    return n + recursion(n-1);
}
```

在这种情况下，这里的每调用一次，就需要先计算`recursion(n-1)`,然后计算 `n+recursion(n-1)`的值， 抽象来看就是执行了两次入栈行为。

### 尾递归方案

```
function recursion(n, rest=0) {
    if (n <= 1) return n+rest;
    return recursion(n-1, rest+n);
}
```

在这种情况下，这里的每调用一次，内部已执行的`rest+n`和`n-1`,处理完后就马上出栈了。抽象来看其实相当于只执行了一次入栈行为。


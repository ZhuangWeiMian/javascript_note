# Webgl入门

## GLSL

### 基本类型

| 类型                    | 说明                                            |
| ----------------------- | ----------------------------------------------- |
| **void**                | 空类型,即不返回任何值                           |
| **bool**                | 布尔类型 true,false                             |
| **int**                 | 带符号的整数 signed integer                     |
| **float**               | 带符号的浮点数 floating scalar                  |
| **vec2, vec3, vec4**    | n维浮点数向量 n-component floating point vector |
| **bvec2, bvec3, bvec4** | n维布尔向量 Boolean vector                      |
| **ivec2, ivec3, ivec4** | n维整数向量 signed integer vector               |
| **mat2, mat3, mat4**    | 2x2, 3x3, 4x4 浮点数矩阵 float matrix           |
| **sampler2D**           | 2D纹理 a 2D texture                             |
| **samplerCube**         | 盒纹理 cube mapped texture                      |



### 常见变量类型

`uniform`是外部程序传递给着色器（shader）的变量，在shader内部，相当于常量

`attribute`是只在顶点着色器使用的变量，用来表示一些顶点相关的信息

`varying`是传递顶点着色器和片段着色器的变量



### 精度限定符

- 精度范围

  - 浮点数范围
    - highp (-2的62次方, 2的62次方); 
    - mediump (-2的14次方, 2的14次方);
    - lowp (-2,2);
  - 整数范围
    - highp (-2的16次方, 2的16次方); 
    - mediump (-2的10次方, 2的10次方); 
    - lowp (-2的8次方, 2的8次方);

- 指定默认精度

  - precision

    - 顶点着色器预定义

      ```
       precision highp float; // 浮点数高精度
       precision highp int;  //  整型高精度
       precision lowp sampler2D; 
       precision lowp samplerCube;
      ```

    - 片段着色器预定义

      ```
       precision mediump int;  // 整型中精度
       precision lowp sampler2D; 
       precision lowp samplerCube;
      ```

    从中可以看出，片段着色器未对浮点数进行预定义，因此需要自己手动在顶部设置浮点数的精度类型



### 绘制模式

- `gl.TRIANGLES`单个单个的三角形

- `gl.TRIANGLE_STRIP`绘制带有共享边的三角形，从第二个三角形开始，每次读取一个顶点，并利用上个三角形的末尾两个顶点构成三角形

  如用四个点绘制矩形，则首个点应该与最后一个顶点成对角

- `gl.TRIANGLE_FAN`绘制带有共享边的三角形。从第二个三角形开始，每次读取一个顶点，利用上个三角形的最后一个顶点和首个顶点进行构成三角形



### 相关api解释

#### enableVertexAttribArray

作用：激活顶点属性，使顶点属性可以被其他方法所使用

#### vertexAttribPointer

作用：将缓存数据绑定到shader的顶点属性中，之后通过`drawArray`进行绘制

#### linkProgram

作用：为片段着色器和顶点着色器准备GPU代码

#### usePrograme

作用：将定义好的webglprogram对象添加到当前的渲染状态

#### drawElements

作用： 绘制立方体

#### drawArray

作用：绘制图形

#### bindBuffer

作用：绑定缓冲 https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/bindBuffer

#### 简单例子

- 绘制彩色矩形

- 旋转的彩色方形

旋转这里是稍微复杂的操作，通过矩阵计算得到围绕原点处理的二维公式，不过也有不关乎线性代数的处理，就是纯sin、cos的计算，官方的计算可以查看维基百科https://zh.wikipedia.org/zh-hans/%E6%97%8B%E8%BD%AC%E7%9F%A9%E9%98%B5

> 升级一下，立方体计算的公式，就涉及到矩阵的计算公式了，可以顺便复习一下线性代数的矩阵计算，2、3维计算还可以。。



- 绘制纹理图片

- 滤镜开发

  简单介绍LUT颜色查找表**https://juejin.im/entry/6844903615123947528**

  常用查找表作者整理https://github.com/smzhldr/AGLFramework/tree/master/appdemo/src/main/assets/lookupfilter

### 纹理绘制

1. 纹理绘制的坐标一般是从`[0, 1]`,从左下角为0，最大为1，这个跟顶点坐标不同，顶点坐标是`[-1,1]`
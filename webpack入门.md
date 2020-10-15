# webpack

> webpack只改动import 和export这部分模块的代码，其他的代码不做处理





- Werbpack 限定文件类型有什么？
- 配件babel-loader 转换jsx语法 默认只解析js相关文件，其他的文件需要通过resolve才会进行解析



最简单的使用webpack来编写react项目的配置

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: [
                  {
                      loader: 'babel-loader', // 这里说明需要babel来转换语法
                      options: { // 这里的options类似于配置根目录的.babelrc.json里面的配置
                        // 说明的是babel的配置
                        presets: ['@babel/preset-react']
                      }
                  }
              ]
          }
      ]
  }
};
```





babel用来转换jsx或者高级的js语言





使用ts

```
 "ts-loader": "^8.0.3",
 "typescript": "^4.0.2",
 "@types/react": "^16.9.49",
 "@types/react-dom": "^16.9.8",
```



tsx最基本配置

```
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
      extensions: ['.ts', '.tsx', '.js'] // 确保有这个，否则会产生error
  },
  module: {
      rules: [
          {
            test: /\.(tsx|ts)?$/,
            use: ['ts-loader'], // 解析ts文件，
            exclude: /node_modules/
          },
          {
              test: /\.(js|jsx)$/,
              use: [
                  {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-react']
                      }
                  }
              ]
          }
      ]
  }
};
```

![image-20200917155550198](/Users/anewzhuang/Library/Application Support/typora-user-images/image-20200917155550198.png)





热更新配置

```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: ['ts-loader'], // 解析ts文件，
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  // 本地服务器，集合热更新
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 读取文件的目录
    compress: true,
    port: 9000
  },
};
```

`package.json`

```
"webpack-dev-server": "^3.11.0"
```


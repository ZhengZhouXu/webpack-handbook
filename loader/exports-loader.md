# exports-loader

## 简介
将js文件中的变量导出为全局变量，对使用一些比较老的插件的时候比较有用

## 示例
```js
// old.js 假设这是一个比较老的插件，没有npm的版本
var sayHello = function () {
  console.log('Hello World')
}

// 在main.js 中引用old.js
var sayHello = require('old.js')

// 配置插件
module: {
  rules: [{
    // 写入old.js的完整路径
    test: require.resolve('./old.js'),
    use: 'exports-loader?sayHello',
    // 也可以导出为其他名称
    // use: 'exports-loader?sayHello=people.SayHello'
  }]
}
```
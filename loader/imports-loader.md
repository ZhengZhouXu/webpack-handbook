# imports-loader

## 简介
导入一些全局变量

## 示例
```js
// 一些模块中this指向windows
module.exports = {
  module: {
    rules: [{
      test: require.resolve("some-module"),
      use: 'imports-loader?this=>window'
    }]
  }
};
```
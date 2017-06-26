# script-loader

## 简介
全局引入模块，相当于在scrip里面写js（此时require, module 等变量则是 undefined）（我感觉不是必要的话，直接在页面中标签引入就行）

## 使用
```js
// 这是文件里面调用loader的一种方式，当然也可以写在配置中，写在配置中的方法可以参考imports-loader和exports-loader
require('script-loader!legacy.js');
```
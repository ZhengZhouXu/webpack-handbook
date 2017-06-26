# webpack.optimize.UglifyJsPlugin

## 简介
用于压缩js，一般在生成环境中才会用到，会加慢打包速度

## 参数
* compress Boolean | Object , 指定是否压缩
```js
// 虽然不知道为什么，我看大家都这么设置
compress: {
    warnings: false
},
```
* sourceMap Boolean ，是否生成sourceMap（可以生成也可以不生成，看需求）。注意：光指定为true是不会生成sourcemap的，还要设置devtool。
* test Regex ，指定需要压缩的文件
* 还有一些属性，要么就是看不懂，要么就是没什么用，具体查看[官网](http://webpack.github.io/docs/list-of-plugins.html) 
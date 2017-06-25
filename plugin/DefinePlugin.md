# webpack.DefinePlugin

## 简介
定义全局变量，用指定的参数代替（切换开发和生产环境特别有用）

```js
// 将所有出现的name换成xuxule，注意：这里的值必须使用stringify转换
new webpack.DefinePlugin({
    name: JSON.stringify('xuxule')
})
```
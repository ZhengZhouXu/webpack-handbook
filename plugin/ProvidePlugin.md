# webpack.ProvidePlugin

## 简介
相当于全局加载一个库，比如有些插件，必须使用jQuery

## 用法
```js
// 当一些插件去搜索jqeury的时候，就会自动引入了
new webpack.ProvidePlugin({
    $: 'jqeury',
    jqeury: 'jquery',
    window.jqeury: 'jqeury'
})
```

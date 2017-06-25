# extract-text-webpack-plugin

## 简单的调用
```js
module.exports = {
    module: {
         rules: [{
            test: /\.css$/,
            // 注意这里不再是 use: 'css-loader', 要用ExtractTextPlugin.extract代替
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
         }]
     },
    plugins: [
        // 写入字符串，就是最后打包的文件名
        new ExtractTextPlugin('styles.css'),
    ]
}
```

## 打包成多个文件
```js
var extractOne = new ExtractTextPlugin('one.css')
var extractTwo = new ExtractTextPlugin('two.css')

module.exports = {
    module: {
         rules: [{
            // 假设这个文件名叫one.css
            test: /one\.css$/,            
            use: extractOne.extract({
                use: 'css-loader'
            })
         }, {
            // 假设这个文件名叫two.css
            test: /one\.css$/,            
            use: extractTwo.extract({
                use: 'css-loader'
            })
         }]
     },
    plugins: [
        // 写入字符串，就是最后打包的文件名
        extractOne,
        extractTwo
    ]
}
```

## new ExtractTextPlugin() 属性
* id 唯一标识符，默认自动生成（一般不会手动设置）
* filename string | Function ，最终生成的文件名，也可以携带子路径,可以使用占位符 [id],[name],[contenthash],多个入口文件的时候使用
```js
// filename 还可以是一个方法，可能在动态生成多个css的时候有用
entry: {
  'js/a': "./a"
},
plugins: [
  new ExtractTextPlugin({
    filename:  (getPath) => {
      return getPath('css/[name].css').replace('css/js', 'css');
    },
    allChunks: true
  })
]
```
* allchunks 默认false，设置为true，就将CommonsChunkPlugin的文件里的css也打包进来
* disable 禁用插件（不知道什么场景会用到）
* ignoreOrder 禁用顺序检查（不知道有什么用）

## ExtractTextPlugin.extract() 属性
* use string | Array | Object ，使用到的loader，单个就使用string，多个就使用Array，多个携带参数使用Object（用数组字符串形式，指定参数也行）
* fallback 没有提取的css解析方式，一般指定为style-loader
* publicPath 覆盖webpack.output里的publicPath
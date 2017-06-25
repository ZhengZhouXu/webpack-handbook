# webpack.optimize.CommmonsChunkPlugin

## 参数
* name 指定需要打包的模块，必须
* names 就是name的复数形式，指定多个
* filename 打包出来的模块名，不指定的就使用output.filename的规则，占位符和output.filename的占位符相同
* minChunks Number | Infinity | Function(module, count) => Boolean，公共模块出现几次才会被打包，默认3，如果是Function的话，就返回一个bool值，判断是否要打包，Infinity 就是不打包，但是会生成公共chunk（好像是说防止被打包）
* chunks Array，需要打包的chunk
* children Boolean ，选择所有子模块（不知道怎么用）(Move common modules into the parent chunk)
* async Boolean | string ，生成一个异步的模块（和chidren一样，试了半天也没有试出来有什么用）
* minSize 公共chunk最小达到多少，才会被执行打包
```js
// 打包第三方库
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', // 指定公共 bundle 的名字。
        minChunks: function (module, count) {
          return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.resolve(__dirname, './node_modules')) === 0
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
    }),
]
    
```
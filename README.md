### entry
* 单文件打包
```js
const config = {
  entry: './src/main.js',
  // ...
}

module.exports = config
```
* 多个文件打包成一个
```js
const config = {
  entry: ['./src/main.js', './src/anther.js'],
  // ...
}

module.exports = config
```
* 打包成多个文件  
注意：output的filename不能指定具体的名称（会报名称重复的错误），可以使用[name]
```js
const config = {
  entry: {
    main: './src/main.js',
    anther: './src/anther.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'bundle')
  }
}
```
### output
val: object  
值为一个对象，这个对象又有很多属性  
* crossOriginLoading 是否启用跨域（我猜应该是打包的js是否启用跨域）  
* chunkFilename 就是指定那些不是，代码中指定分块的chunk名，比如require.ensure出来的模块，require([], function) 出来的模块。简而言之就是，没有在entry里面定义的chunk的名字。 
* devtoolLineToLine 启用行对行映射。（也不知道有什么用，可能和sourcemap有关吧）  
* filename 打包后的文件名  
[name] 被 chunk 的 name 替换。  
[hash] 被 compilation 生命周期的 hash 替换。  
[chunkhash] 被 chunk 的 hash 替换  
* hotUpdateFunction webpack 中用于异步加载(async load)热更新(hot update) chunk 的 JSONP 函数，默认值："webpackHotUpdate"
* hotUpdateMainFilename（等尝试热更新的时候可以试试）  
[hash] 被 compilation 生命周期的 hash 替换。（最后一个 hash 存储在记录中）  
默认值："[hash].hot-update.json"
```js
// 单文件,直接写文件名就行，用占位符也行
output: {
  filename: 'bunld.js',
  // ...
}

// 多文件,用占位符代替
output: {
  filename: '[name].js',
  // ...
}
```
* hotUpdateChunkFilename 热更新chunk的名字（感觉没啥用）  
[id] 被 chunk 的 id 替换。  
[hash] 被 compilation 生命周期的 hash 替换。（最后一个 hash 存储在记录中）  
默认值："[id].[hash].hot-update.js"

### target
val: string  
> 指定运行环境，默认是 'web'，也可以指定 'node'，还有其他环境（用不太到）。

### require.ensure
调用require.ensure时引入，require时执行对应模块
```js
  require.ensure([], function() {
    var c = require('./c')
  })
```

参数1：数组，定义依赖模块（暂时没发现有什么用，先就是加载数组里指定的模块）
参数2：回调函数，可以使用require引入需要的模块
参数3：chunk名，同名的话会被打包在一起。

总结：理论上比 require([], function) 更好的掌控chunk打包（花样比较多），但是比 require([], function) 用起来麻烦。（我vue的异步组件还是使用 require([], function) 比较方便）
### require([], function)
分模块加载，采用amd规范

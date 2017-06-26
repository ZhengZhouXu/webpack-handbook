## 属性

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
val: object
> 值为一个对象，这个对象又有很多属性
> crossOriginLoading 是否启用跨域（我猜应该是打包的js是否启用跨域）
* jsonpFunction 异步加载的JSONP函数
* library 指定library名称，（发布包的时候可能会用到）
* libraryTarget 打包格式（写库的时候打包很有用）
```js
// 假设说我要打包一个jqeury的包
output: {
  // ...
  libraryTarget: 'var',
  library: 'jquery'
}
```
* path 输出的目录路径
* publicPath 告诉配置啊，插件啊，最终css，js写入html的路径就是publicPath的路径
* sourceMapFilename sourceMap文件名（可以使用占位符，很少会特意去配置它吧）

### module加载器
val: Array  
有一个module对象，对象里有个rules数组，数组又由对象构成，对象有一个属性test存放转换的文件，use指定loader，越后面的loader，越先被调用。  
解析css的时候必须要有style-loader，不然不能写入html的style中  
```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

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
### devtool
val: string
> 指定生成sourceMap的格式（大概7种，搜一下就行了）

## 其他
### 命令行参数
* webpack 执行一次开发时的编译
* webpack -p 执行一次生成环境的编译（压缩）
* webpack --watch 在开发时持续监控增量编译（很快）
* webpack -d 让他生成SourceMaps
* webpack --progress 显示编译进度
* webpack --colors 显示静态资源的颜色
* webpack --sort-modules-by, --sort-chunks-by,--sort-assets-by 将modules/chunks/assets进行列表排序
* webpack --display-chunks 展示编译后的分块
* webpack --display-reasons 显示更多引用模块原因
* webapck --display-error-details 显示更多报错信息

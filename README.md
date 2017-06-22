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
> 值为一个对象，这个对象又有很多属性
> crossOriginLoading 是否启用跨域（我猜应该是打包的js是否启用跨域）

### target
val: string  
> 指定运行环境，默认是 'web'，也可以指定 'node'，还有其他环境（用不太到）。
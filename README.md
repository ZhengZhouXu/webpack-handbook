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
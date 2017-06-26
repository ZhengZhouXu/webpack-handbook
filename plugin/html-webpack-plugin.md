# html-webpack-plugin

## 调用
```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()] // 像这样不用指定参数就可以调用，在dist直接会生成一个默认index.html
};
```

## 参数
* title 指定生成html的title。（没什么用，一般都会指定template，指定template后title就没用了）
* filename 指定生成的文件名，或者一个子目录比如 'view/a.html'，默认就是'index.html'
* template 生成html的模板（一般都会用这个）
> 1. 值是一个文件名，一般不指定loader的话，要么就是ejs，要么就是html（html的话，就不能使用模板引擎了）
```js
{
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ]
}
```
2. 使用特定的loader(不推荐)
```js
new HtmlWebpackPlugin({
  // For details on `!!` see https://webpack.github.io/docs/loaders.html#loader-order
  template: '!!handlebars!src/index.hbs'
})
```
3. 在module中定义的加载器直接就可以调用(推荐)
```
{
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.hbs'
    })
  ]
}
```

* inject true | false | 'body' | 'head' js自动注入的地方，true和 'body' 作用相同，'head'就注入到head里面。一般很少去设置head，要么设置false，可以自己定义位置。
* favicon favicon文件的路径（没啥用，可以指定，也可以自己写）
* minify html的压缩配置，配置比较多，但都不难 [点这里查看](https://github.com/kangax/html-minifier#options-quick-reference) (还算有用，尤其是大页面打包的时候)
* hash true | false ，指定为true时，webpack每次编译提供一个hash值，类似下面那样，清除缓存用
```html
 <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
```
* cache true | false， 默认为true，只有当文件修改时才重新生成文件（用不到，直接默认值就行了）
* showErrors true | false，默认为true，将错误输出在页面上。（生产环境还是改为false比较合理）
* chunks 指定那个chunk注入到模板中（在多页面中会用到）
* excludeChunks 和chunks相反，指定不注入的chunk
* chunksSortMode 'none' | 'auto' | 'dependency' | {function}，定义脚本引用顺序。（反正只要脚本引用顺序没出错，就不用设置）
* xhtml true | false，为true时将link标签渲染为闭合（除非是xhtml，不然一点用没有）

## 常见问题
### 1. 多页面
多次声明就行
```
pulgin: {
    new htmlWebpackPlugin(),
    new htmlWebpackPlugin({
        template: 'name.html'
    })
}
```

### 2. 编写自己的模板
如下
```js
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template',
    template: 'my-index.ejs', // Load a custom template (ejs by default see the FAQ for details) 
  })
]
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

### 3. 可以使用一下特殊的变量
```js
"htmlWebpackPlugin": {
  "files": {
    "css": [ "main.css" ],
    "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
    "chunks": {
      "head": {
        "entry": "assets/head_bundle.js",
        "css": [ "main.css" ]
      },
      "main": {
        "entry": "assets/main_bundle.js",
        "css": []
      },
    }
  }
}
```
* 除了上文指定的一些option外，还可以自定义一些option，这些option可以在模板中被取到

### 还有一些钩子函数（没啥用，具体参考官网）
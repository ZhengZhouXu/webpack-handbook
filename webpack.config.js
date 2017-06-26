// 一个基本的webpack模板
var path = require('path')
var webpack = require('webpack')

// 自动插入标签的插件
var htmlWepbackPlugin = require('html-webpack-plugin')

const config = {
    // 值就是一个字符串，指定打包的js的运行环境，很有用，比如可以指定node环境，写后台等等，默认值就是web。
    target: 'web',
    // entry是必须的，值也可以是一个数组,也可以就一个字符串:
    // entry: ['./a.js', './b.js']  ==> 指定的js都会被打包在一起
    // entry: './main.js'  ==> 就只有一个入口文件的时候
    entry: {
        main: './main.js'
    },
    // output也是必须的，output能配置的属性特别多，简要的摘几个
    output: {
        // filename必须指定，打包后的文件名，可以用占位符[name],[hash],[chunkhash]
        filename: '[name].js',
        // path必须指定，文件打包后存储的路径，注意路径都写成觉得路径，以免意外
        path: path(__dirname, './dist'),
        // 插入标签的路径，比如本来是 <script src="./main.js">  ===> <script src="http://www.xuxule.top/main.js">
        // 有些插件可能会用到这个属性，比如 htmlWepbackPlugin 就会用到，虽然不是必须，但是很有用，一般都会加
        publicPath: 'http://www.xuxule.top',
        // 指定要分离出去的第三方库，在CommonsChunkPlugin中会被用到，因为CommonsChunkPlugin很有用，所以这个属性也经常用到。
        vendor: ['jquery'],
        // 如果是写第三方库的时候，指定库的名字，和之后的libraryTarget混合使用
        // 这个是你库被调用的名称，比如这里可能的调用形式就是 require('xxl-jquery')
        library: 'xxl-jquery',
        // 简单的说是指定库的导出形式，具体用到的时候看文档
        libraryTarger: 'var',
        // 指定生成sourceMap的名称，可以使用占位符[file], [id], [hash]，这种东西基本用不到，不用管
        sourceMapFilename: '',

        // ...
        // 还有很多配置文件，等有空，或者遇到的时候再说
    },
    // 定义sourceMap的生成格式
    devTool: '',
    // 配置loader用的，虽然说不是必须的，但是介于loader不可能不用，这个属性也相当于必须的
    module: {
        // 配合loader规则的，比如配置 .css 结尾的文件让 css-loader 来解析，就是这么个作用
        // 值是一个数组
        rules: [{
            // 值是一个正则，匹配那些文件被这个loader解析
            test: /\.css$/,
            // 值是一个数组，顺序很重要，越早解析的放在越后面，比如 css 文件的解析顺序是
            // css-loader ===> style-loader
            // 那么配置就该像下面这样
            use: [{
                // 指定loader
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                // loader的参数，参数嘛，就是根据不同的情况，产出不同的效果
                options: {
                    modules: true
                }
            }]
        }]
    },
    // 和module差不多，因为不可能不用，所以基本上算是必须的，用来指定插件
    plugin: [
        // 定义插件都是这种定义一个类的方式，然后里面可以传一些特定的参数
        // 这个 htmlWepbackPlugin 开发web的话基本上都是要用到的
        new htmlWepbackPlugin({
            template: './index.html'
        })
    ],
    // 定义一些别名，后缀名什么的
    resolve: {
        // 后缀名自动补全
        extensions: ['', '.js', '.vue'],
        // 定义别名，路径搜索的时候就将vue替换为对应的路径
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '业务录单' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
const port = process.env.VUE_APP_PORT || process.env.npm_config_port || 10001 // dev port

const assetsCDN = {
  externals: {
    'pdfjsDistBuildPdf.PDFJS': 'PDFJS'
  }
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'v2-sub-app/static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/API': {
        // 虚拟目录
        // target: "http://218.98.113.88:42030/api/", //测试环境
        // target: "http://172.16.11.132:51100/api/",//测试环境
        // target: 'http://172.16.12.41:8001', // shaoting
        // target: 'http://172.16.12.127:8005', // 钟文华
        // target: 'http://172.16.12.86:9001', // 许金明
        // target: 'http://10.10.26.39:9001', // 许金明2
        // target: 'http://10.10.26.20:9001', // 曾仕斌
        // target: 'http://172.16.12.40:8010', //邓少辉
        // target: 'http://172.16.12.98:9001', // 坤楠
        // target: 'http://172.16.12.62:8006', //何毅辉
        // target: 'http://192.168.88.115:19121', //华为obs
        // target: 'http://192.168.88.115:19225',
        target: 'https://uat-fq.esnotary.com/', // 赋强测试环境
        // target: 'http://192.168.88.115:18311/api/processConfig',
        changeOrigin: true,
        pathRewrite: {
          '^/API': '/'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      library: `${name}`,
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    },
    // ,
    //   filename: `js/[name].${TimeStamp}.js`,
    //   chunkFilename: `js/[name].${TimeStamp}.js`
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: { // 删除注释
              comments: false
            },
            // 生产环境自动删除console
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true, // 清除 debugger 语句
              drop_console: true, // 清除console语句
              pure_funcs: ['']
            }
          },
          sourceMap: false,
          parallel: true
        })
      ]
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      // to ignore runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }])
    config.plugin('html').tap((args) => {
      args[0].cdn = assetsCDN
      return args
    })

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/functions.scss";`
      }
    }
  }
}

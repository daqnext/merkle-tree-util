/*
 * @Author: your name
 * @Date: 2021-10-09 17:23:30
 * @LastEditTime: 2021-10-09 18:08:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /merkle-tree-util/webpack.config.js
 */
const path = require("path")
const webpack = require("webpack");
const config ={
    mode:"production",
    entry:"./dist/src/pkg.js",
    output:{
        filename:"merkle-tree-util-min.js",
        path:path.resolve(__dirname,"pkg")
    },
    resolve: {
        // https://github.com/babel/babel/issues/8462
        fallback: {
          //crypto: require.resolve('crypto-browserify'),
          //path: require.resolve('path-browserify'),
          //url: require.resolve('url'),
          buffer: require.resolve('buffer/'),
          //util: require.resolve('util/'),
          //stream: require.resolve('stream-browserify/'),
          //vm: require.resolve('vm-browserify')
        },
        // alias: {
          
        // }
      },
      plugins: [
        //new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //   template: path.join(__dirname, "../src/index.html"),
        //   filename: "index.html"
        // }),
        // new webpack.DefinePlugin({
        //   "process.env.NODE_DEBUG": JSON.stringify(false)
        //   // Buffer: JSON.stringify(require("buffer/").Buffer)
        // }),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"]
        })
      ]
    }


module.exports=config
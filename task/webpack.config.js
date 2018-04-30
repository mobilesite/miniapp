const { resolve } = require('path');
const r = url => resolve(__dirname, url);
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devtool: false,
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  output: {
    path: r('../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      util: r('../util/util')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              'env',
              {
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader'
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader' //css-loader 解释(interpret) @import 和 url()
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'not ie <= 8'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          path: r('../'),
          dist: './dist'
        }
      }
    ]
  },
  plugins: [
    //提取出来样式写入到.wxss中
    new MiniCssExtractPlugin({
      filename: '[name].wxss'
    }),
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'pages/**/*.json',
        },
        to: ''
      },
      {
        from: 'static',
        to: 'static'
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin()
  ],
}
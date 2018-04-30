require('shelljs/global');
const webpack = require('webpack');
const fs = require('fs');
const _ = require('lodash');
const { resolve } = require('path');
const r = url => resolve(__dirname, url); 

const webpackConfig = require('./webpack.config');
const minaConfig = require(r('./mina.config'));
const assetsPath = r('../mina');

rm('-rf', assetsPath);
mkdir(assetsPath);

var renderConfig = webpackConfig;

var entry = () => _.reduce(minaConfig.json.pages, (en, i) => {
  en[i] = resolve(process.cwd(), './', `${i}.mina`)

  return en;
}, {});

renderConfig.entry = entry();
renderConfig.entry.app = minaConfig.app;

renderConfig.output = {
  path: r('../mina'),
  filename: '[name].js'
}

var compiler = webpack(renderConfig);

//写入小程序的app.json文件
fs.writeFileSync(r('../mina/app.json'), JSON.stringify(minaConfig.json), 'utf8');

compiler.watch({
  aggregateTimeout: 300,
  poll: true
}, (err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: true,
    chunks: true,
    chunkModules: true
  }) + '\n\n')
});


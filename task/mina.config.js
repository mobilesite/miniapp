
const { resolve } = require('path');
const r = url => resolve(__dirname, url);
module.exports = {
  json: {
    pages: [
      'pages/index/index',
      'pages/logs/logs',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Wechat',
      navigationBarTextStyle: 'black'
    }
  },
  style: {
    url: r('../style/base.sass'),
    lang: 'sass'
  },
  app: r('../app.js')
}
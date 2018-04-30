//对一些函数进行封装，暴露一些全局的变量

import regeneratorRuntime from 'regenerator-runtime';

global.regeneratorRuntime = regeneratorRuntime;

import util from './util/util';

global.util = util;

const R = require('ramda');
global.R = R;

const asyncWrap = fn => (options = {}) => new Promise((resolve, reject) => {
  let conf = {
    success: res => {
      console.log(res)
      resolve(res)
    }
  };

  wx[fn](R.merge(conf, options));
})

wx.getSettingAsync = asyncWrap('getSetting');
wx.getSystemInfoAsync = asyncWrap('getSystemInfo');
wx.loginAsync = asyncWrap('login');
wx.getUserInfoAsync = asyncWrap('getUserInfo');
wx.reqAsync = asyncWrap('request');
import vue from 'vue';
import iview from 'iview';
import axios from 'axios';
import vueAxios from 'vue-axios';

vue.use(vueAxios, axios);

export const apiUrls = {
  cangm: {
    baseURL: 'https://wa.csyaoly.com'
  },
  cs4pl: {
    baseURL: 'https://www.yao4pl.com:9301'
  },
  loginUrl: {
    baseURL: 'https://yao4pl.com/login/6/csbr?',
    loginCheck: 'https://yao4pl.com/app/openroute/YlY2PRO.PlatForm.API.OpenAPI/IsLogin'
  },
  CarrierloginUrl: {
    baseURL: 'https://yao4pl.com/login/2/csbr?'
  },
  cmsurl: {
    baseURL: 'https://cms.yao4pl.com'
  },
  CtaUrl: {
    baseURL: 'https://yao4pl.com/Logistics/Trtpltenantflow/UserCenter'
  },
  yaoqiURL: {
    // baseURL: 'http://123.126.20.94:3390'
    baseURL: 'https://csxjapi.yao4pl.com:8089'
  },
  jiajiUrl: {
    // baseURL: 'http://117.78.45.71:9309'
    baseURL: 'https://www.yao4pl.com:9301'
  }

};

const imgurl = {
  cangm: 'https://wa.csyaoly.com',
  cs4pl: 'https://yao4pl.com/uploadfiles'
}

vue.prototype.apiUrls = apiUrls;
vue.prototype.imgurl = imgurl;
// api请求基地址
axios.defaults.baseURL = apiUrls.cs4pl.baseURL;

/**
 * axios请求拦截处理
 */
axios.interceptors.request.use(config => {


  if (!config.hideTip) {
    iview.LoadingBar.start();
  }

  return config;
});

/**
 * axios响应拦截处理。
 */
axios.interceptors.response.use(response => {
  if (!response.config.hideTip) {
    iview.LoadingBar.finish();
  }
  if (response.data.success == null || response.data.success == undefined) {
    response.data.success = true;
  }
  if (response.data.errorCode == null || response.data.errorCode == undefined) {
    response.data.errorCode = "0";
  }
  if (!response.data.success || response.data.errorCode != "0") {
    iview.Notice.error({
      title: '错误！',
      desc: response.data.message,
      duration: 10
    });

    return Promise.reject(response.data.message);
  }

  return response.data;
}, error => {
  iview.LoadingBar.error();
  if (error.response) {
    iview.Notice.error({
      title: '错误',
      desc: `请求发生【${error.response.data.error}】的错误。<br/>错误详情：${error.response.data.message}`
    });
  } else {
    iview.Message.error('网络错误！');
  }

  return Promise.reject(error);
});

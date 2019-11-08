import axios from 'axios';
import cookie from 'js-cookie';
const url = require('url');
const qs = require('querystring');
import {apiUrls} from '@/util/axios-util'
/*
将登录后返回的信息存储到cookie
*/
export const setLoginCookie = () =>{
  let obj = url.parse(location.href);
  if(obj.query){

    let query =  qs.parse(obj.query);
    if(query && query.tk != 'undefined'){
      cookie.set('sfylogintoken', query.tk.replace('/',''), { expires: 1 });
    }

  }
};

/*
验证本地cookes是否有效
*/
export const isLogin = async () => {
  //console.log('gyhTest:' + apiUrls.loginUrl.loginCheck);
  //return;
  let tk = cookie.get('sfylogintoken');
  if(tk == '' || typeof tk == 'undefined'){
    return {
      Name: '',
      CorpName: '',
      UserType: '',
      RoleName: '',
      LoginType: false
    };
  }
  return await axios.get(apiUrls.loginUrl.loginCheck, {
    params: {
      authToken: tk
    }
  })
  .then(function (res) {
    if(res.code == 'SUCC'){
      console.log('loginTest:true');
      let userInfo = JSON.parse(res.data);
      let user = {
        Name: userInfo.UserName,
        CorpName: userInfo.CorpName,
        UserType: userInfo.UserType,
        RoleName: '普通',
        LoginType: true
      };
      return user;
    }else{
      return {
        Name: userInfo.UserName,
        CorpName: '',
        UserType: '',
        RoleName: '',
        LoginType: false
      };
      console.log('loginTest:false');
    }
  })
  .catch(function (error) {
    console.log('login check fault:' + error);
  })
};

/*
清除cookie
*/
export const clearCookie = () => {
  cookie.remove('sfylogintoken');
};

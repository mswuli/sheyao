import Vue from 'vue';
import Vuex from 'vuex';
import provinces from './provinces';
// import VueCookies from 'vue-cookies';

Vue.use(Vuex);
// Vue.use(VueCookies);

// const roles = new Map();

// roles.set('0', '管理员');
// roles.set('1', '货主');
// roles.set('6', '会员');

export default new Vuex.Store({
  state: {
    user: {
      Name: null,
      CorpName: null,
      UserType: null,
      RoleName: '普通',
      LoginType: true,
    },
    provinces: provinces,

    // roles: roles,
    showLoading: false,
    latestNews: [],
    index: 0,
    activeName: 1
  },
  getters: {
    // isLogged(state) {
    //   return state.user.Name;
    // },
    // isAdmin(state) {
    //   return state.user.UserType == '0';
    // },
    areas(state) {
      return state.provinces.map(p => {
        return {
          label: p.label,
          value: p.value,
          children: (() => {
            let items = p.children.map(c => {
              return {
                label: c.label,
                value: c.value
              };
            });

            items.unshift({
              label: '不限',
              value: ''
            });

            return items;
          })()
        };
      });
    },
    provinces(state) {
      return state.provinces.map(p => {
        return {
          label: p.label,
          value: p.value
        }
      });
    },
    cities(state) {
      return function (province) {
        let cities = state.provinces.find(p => p.value == province);

        return cities ? cities.children : [];
      }
    }
  },
  mutations: {
    logOn(state, user) {
      state.user.Name = user.Name;
      state.user.CorpName = user.CorpName;
      state.user.UserType = user.UserType;
      state.user.LoginType = user.LoginType;
      state.user.AgreementType = user.AgreementType;
      window.sessionStorage.user = JSON.stringify(state.user);
    },
    logOff(state) {
      state.user.Name = null;
      state.user.CorpName = null;
      state.user.UserType = null;
      state.user.RoleName = null;
      state.user.LoginType = false;
      state.user.AgreementType = false;
      window.sessionStorage.removeItem('user');
    },
    loading(state, loading = true) {
      state.showLoading = loading
    },
    SetlatestNews(state, txt) {
      state.latestNews = txt;
    },
    setindex(state, txt) {
      state.index = txt;
    },
    navIndex(state, name){
      state.activeName = name;
    }
  }
});

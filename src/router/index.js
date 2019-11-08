import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview';
import {setLoginCookie,isLogin} from '@/util/commonFun';
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/index',
      name: '首页-医药四方云平台',
      meta: {
        title: '医药四方云',
        content: 'disable',
        keepAlive: true
      },
      component: resolve => require(['@/components/index.vue'], resolve)
    },
    {
      path: '/about',
      name: '关于我们-医药四方云平台',
      meta: {
        title: '关于我们',
        keepAlive: true
      },
      component: resolve => require(['@/components/about.vue'], resolve)
    },
    {
      path: '/solution',
      name: '综合解决方案-信息化解决方案-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/solution.vue'], resolve)
    },
    {
      path: '/solution2',
      name: '综合解决方案-四方运营-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/solution2.vue'], resolve)
    },
    {
      path: '/solution3',
      name: '综合解决方案-供应链金融-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/solution3.vue'], resolve)
    },
    {
      path: '/news/:name?',
      name: '平台资讯-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/news.vue'], resolve)
    },
    {
      path: '/newsDetail/:guid?/:typeName?',
      name: '平台资讯详情-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/newsDetail.vue'], resolve)
    },
    {
      path: '/capacity/:guid?',
      name: '运力网-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/capacity.vue'], resolve)
    },
    {
      path: '/warehouse/:guid?',
      name: '仓储网-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/warehouse.vue'], resolve)
    },
    {
      path: '/warehouseDetail/:guid',
      name: '仓储详情-医药四方云平台',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/warehouseDetail.vue'], resolve)
    },
    {
      path: '/forgetPassword',
      name: '找回密码',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/forgetPassword.vue'], resolve)
    },
    {
      path: '/userCenter',
      name: '用户中心',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/userCenter.vue'], resolve)
    },
    {
      path: '/problem',
      name: '常见问题',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/commonProblem.vue'], resolve)
    },
    {
      path: '/business',
      name: '商务合作',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/businessCooperation.vue'], resolve)
    },
    {
      path: '/register',
      name: '注册',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/common/register.vue'], resolve)
    },
    {
      path: '/probationRegister',
      name: '申请试用',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/common/probationRegister.vue'], resolve)
    },
    {
      path: '/agreement',
      name: '协议',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/common/agreement.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/jiaji',
      name: '上海佳吉快运有限公司',
      component: resolve => require(['@/components/visualization/jiaji.vue'], resolve)
    },
    {
      path: '/jiaji2',
      name: '上海佳吉快运有限公司2',
      component: resolve => require(['@/components/visualization/jiaji2.vue'], resolve)
    },
    {
      path: '/tsl',
      name: '陕西天士力医药物流中心',
      component: resolve => require(['@/components/visualization/tsl.vue'], resolve)
    }
  ]
})

router.beforeResolve((to, from, next) => {
  const user = JSON.parse(window.sessionStorage.user || 'null');

  if (user) {
    router.app.$store.commit('logOn', user);
  }
setLoginCookie();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user || !user.Name) {
      iview.Message.info('请登录！');
      return next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      const rights = to.meta.rights || [];

      if (!rights.find(r => r == user.UserType)) {
        iview.Notice.warning({
          title: '警告',
          desc: '您没有使用该功能的权限，该功能由【' + router.app.$store.state.roles.get(rights[0]) + '】使用！'
        });

        return;
      }
    }
  }

  iview.LoadingBar.start();

  next() // 确保一定要调用 next()
});

router.afterEach(to => {
  window.scroll(0, 0);
  iview.LoadingBar.finish();
  isLogin().then(user => {
    if (user) {
      router.app.$store.commit('logOn', user);
    }
  });
});

export default router;

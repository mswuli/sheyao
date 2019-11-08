<template>
  <div class="header-wrap">
    <div class="header-link">
      <ul>
        <li @click="evaluate()">企业自评</li>
        <li class="not-allowed" title="敬请期待">协会复评</li>
        <li v-if="$store.state.user.LoginType==false">
          <a :href="loginUrl">登录</a>
        </li>
        <li v-else>
          <a :href="LoginCtaUrl">医药四方云入口</a>
        </li>
        <li v-if="$store.state.user.LoginType==false" @click="showRegister" class="login">注册</li>
        <li v-else @click="Exit()" class="login">退出</li>
        <li class="logged" style="display:none">
          <span class="iconfont icon-user_name">
            {{loginName}},欢迎您
            <Icon type="ios-arrow-down"/>
          </span>
          <div class="logout-box">
            <router-link to="/userCenter">个人中心</router-link>
            <a>退出</a>
          </div>
        </li>
        <li v-if="$store.state.user.LoginType==false" @click="showProbationRegister" class="login">申请试用</li>
      </ul>
    </div>
    <div class="menu">
      <router-link to="/index" class="logo">
        <img src="../../assets/images/logo2.png" alt>
      </router-link>
      <!-- 导航 start -->
      <Menu mode="horizontal" :theme="theme1" @on-select="navUrl" class="mainMenu">
        <MenuItem name="1" :class="$store.state.activeName=='1'?'ivu-menu-item-active':''">首页</MenuItem>
        <MenuItem name="2" :class="$store.state.activeName=='2'?'ivu-menu-item-active':''">资讯</MenuItem>
        <MenuItem name="3" :class="$store.state.activeName=='3'?'ivu-menu-item-active':''">运力网</MenuItem>
        <MenuItem name="4" :class="$store.state.activeName=='4'?'ivu-menu-item-active':''">仓储网</MenuItem>
        <!-- <MenuItem name="5" :class="$store.state.activeName=='5'?'ivu-menu-item-active':''">综合解决方案</MenuItem> -->
        <Submenu name="5" :class="$store.state.activeName=='5'?'ivu-menu-item-active':''">
          <template slot="title">综合解决方案</template>
          <MenuGroup>
            <MenuItem name="5-1">
              <router-link to="/solution">信息化解决方案</router-link>
            </MenuItem>
            <MenuItem name="5-2">
              <router-link to="/solution2">四方运营</router-link>
            </MenuItem>
            <MenuItem name="5-3">
              <router-link to="/solution3">供应链金融</router-link>
            </MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="6" :class="$store.state.activeName=='6'?'ivu-menu-item-active':''">平台介绍</MenuItem>
      </Menu>
      <!-- 导航 end -->
    </div>
  </div>
</template>

<script>
import { clearCookie } from "@/util/commonFun.js";
export default {
  name: "c-menu",
  data() {
    return {
      theme1: "light",
      activeName: 1
    };
  },
  computed: {
    loginUrl() {
      //从顶部点击了登录按钮，直接跳转到登录页面，登录成功后不返回
      return `${this.apiUrls.loginUrl.baseURL}`;
    },
    loginName() {
      return this.$store.state.user.Name;
    },
    LoginCtaUrl() {
      return `${this.apiUrls.CtaUrl.baseURL}`;
    }
  },
  methods: {
    activeIndex(index) {
      this.ind = index;
    },
    navUrl(name) {
      if (name == 1) {
        this.$store.commit("navIndex", 1);
        this.$router.push(`/index`);
      } else if (name == 2) {
        this.$store.commit("navIndex", 2);
        this.$router.push(`/news/`);
      } else if (name == 3) {
        this.$store.commit("navIndex", 3);
        this.$router.push(`/capacity/`);
      } else if (name == 4) {
        this.$store.commit("navIndex", 4);
        this.$router.push(`/warehouse/`);
      } else if (name == 5) {
        this.$store.commit("navIndex", 5);
        this.$router.push(`/solution`);
      } else if (name == 6) {
        this.$store.commit("navIndex", 6);
        this.$router.push(`/about`);
      }
      //console.log(name);
    },
    showRegister() {
      this.$router.push(`/register`);
    },
    showProbationRegister(){
      this.$router.push(`/probationRegister`);
    },
    Exit() {
      clearCookie();
      this.$store.commit("logOff");
      //this.$router.push({ path: "/index" });
      location.href = "/";
    },
    evaluate() {
      /*单击了自评按钮，如果登录了跳转到自评页面，未登录就跳转到登录页面*/
      if (this.$store.state.user.LoginType == true) {
        window.location.href = "http://yao4pl.com/cta/evaluation/index";
        //window.location.href = 'http://192.168.2.89:9391/Logistics/Trtpltenantflow/CloudCarrierLogisticsTransitDataIndex';
      } else {
        window.location.href =
          `${this.apiUrls.loginUrl.baseURL}` +
          "NavigateValue=http://yao4pl.com/cta/evaluation/index";
      }
    }
  },
  mounted() {
    this.activeName = this.$store.state.activeName;
    // console.log(this.$store.state.activeName);
  }
};
</script>

<style scoped>
.header-wrap {
  background: #fff;
}
.header-link {
  height: 52px;
  background: #1f5378;
}
.header-link ul {
  width: 1200px;
  margin: 0 auto;
  text-align: right;
  padding: 11px 0;
}
.header-link ul li {
  display: inline-block;
  height: 24px;
  line-height: 22px;
  color: #fff;
  padding: 0 10px;
  border: 1px solid #fff;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.5s;
}
.header-link ul li a {
  color: #fff;
}
.header-link ul li.login {
  height: 30px;
  line-height: 28px;
  font-size: 16px;
  color: #4aa8e5;
  background: #fff;
}
.header-link ul li.logged {
  position: relative;
  border: 0;
}
.header-link ul li span::before {
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-right: 5px;
}
.logout-box {
  display: none;
  position: absolute;
  top: 24px;
  right: 0;
  width: 100%;
  padding: 10px;
  background: #fff;
  text-align: center;
}
.logout-box a {
  display: block;
  line-height: 32px;
}
.header-link ul li:hover .logout-box {
  display: block;
}
.menu {
  width: 1200px;
  height: 100px;
  margin: 0 auto;
}
.menu .logo {
  float: left;
  padding: 12px 0 38px;
}
.menu-item {
  float: right;
  padding-top: 15px;
}
.menu-item li {
  float: left;
}
.menu-item li a {
  display: block;
  line-height: 26px;
  font-size: 20px;
  color: #333;
  padding: 0 15px 20px;
}
.menu-item li:hover a,
.menu-item li.active a {
  color: #4aa8e5;
  border-bottom: 1px solid #4aa8e5;
}
.ivu-menu {
  float: right;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  height: 0;
}
.ivu-menu-item {
  font-size: 20px;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
  color: #333;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
  color: #4aa8e5;
  border-bottom: 1px solid #4aa8e5;
}
</style>

<template>
<div>
  <div class="index-header">
    <div class="index-menu">
      <router-link to="/index" class="logo">
        <img src="../assets/images/logo.png" alt="">
      </router-link>
      <div class="index-header-right">
        <ul class="index-menu-entry">
          <li>
            <!-- <a>涉药运输企业评估</a> -->
            <a @click="evaluate()">企业自评</a>
          </li>
          <li class="not-allowed" title="敬请期待">
            <!-- <a>监药研究会入口</a> -->
            <a>协会复评</a>
          </li>
          <li v-if="$store.state.user.LoginType==false"><a :href="loginUrl">登录</a></li>
          <li v-else><a :href="LoginCtaUrl">医药四方云入口</a></li>
          <li v-if="$store.state.user.LoginType==false" @click="showRegister" class="login">注册</li>
          <li v-else @click="Exit()" class="login">退出</li>
          <li class="logged" style="display:none">
            <span class="iconfont icon-user_name">{{loginName}},欢迎您<Icon type="ios-arrow-down" /></span>
            <div class="logout-box">
              <router-link to="/userCenter">个人中心</router-link>
              <a>退出</a>
            </div>
          </li>
          <li v-if="$store.state.user.LoginType==false" @click="showProbationRegister" class="login">申请试用</li>
        </ul>
        <!-- <ul class="index-menu-content">
          <li v-for="(item,index) in nav" :key="item.value" :class="{'active':ind == index}" @click.native="activeIndex(index)">
            <router-link :to="{path:item.path}">
              {{item.title}}
            </router-link>
          </li>
        </ul> -->
        <Menu mode="horizontal" :theme="theme1" @on-select="navUrl" class="indexMenu">
          <MenuItem name="1" :class="$store.state.activeName=='1'?'ivu-menu-item-active':''">首页</MenuItem>
          <MenuItem name="2" :class="$store.state.activeName=='2'?'ivu-menu-item-active':''">资讯</MenuItem>
          <MenuItem name="3" :class="$store.state.activeName=='3'?'ivu-menu-item-active':''">运力网</MenuItem>
          <MenuItem name="4" :class="$store.state.activeName=='4'?'ivu-menu-item-active':''">仓储网</MenuItem>
          <!-- <MenuItem name="5" :class="$store.state.activeName=='5'?'ivu-menu-item-active':''">综合解决方案</MenuItem> -->
          <Submenu name="5" :class="$store.state.activeName=='5'?'ivu-menu-item-active':''">
            <template slot="title">综合解决方案</template>
            <MenuGroup>
              <MenuItem name="5-1"><router-link to="/solution">信息化解决方案</router-link></MenuItem>
              <MenuItem name="5-2"><router-link to="/solution2">四方运营</router-link></MenuItem>
              <MenuItem name="5-3"><router-link to="/solution3">供应链金融</router-link></MenuItem>
            </MenuGroup>
          </Submenu>
          <MenuItem name="6" :class="$store.state.activeName=='6'?'ivu-menu-item-active':''">平台介绍</MenuItem>
        </Menu>
      </div>
    </div>
    <div class="banner">
      <Carousel v-model="value1" loop arrow="never" autoplay :autoplay-speed="autoplaySpeed">
        <CarouselItem v-for="(banner, index) in banners" :key="index">
          <img :src="banner.path">
        </CarouselItem>
      </Carousel>
    </div>
    <!-- <div class="banner-search">
      <input type="text" placeholder="请输入物流单号/业务单号">
      <button><Icon type="ios-search" />查询</button>
    </div> -->
  </div>
  <div class="index-wrap">
    <ul class="index-show">
      <li>
        <p>已入驻药企</p>
        <span><b>{{ show.yaoqi | amount }}</b>家</span>
      </li>
      <li>
        <p>入驻仓储企业</p>
        <span><b>{{ show.warehouse | amount }}</b>家</span>
      </li>
      <li>
        <p>仓储总面积</p>
        <span><b>{{ show.totalArea | amount }}</b>m²</span>
      </li>
      <li>
        <p>入驻运力企业</p>
        <span><b>{{ show.transport | amount }}</b>家</span>
      </li>
      <li>
        <p>平台车辆总数</p>
        <span><b>{{ Cardata.Car | amount }}</b>辆</span>
      </li>
    </ul>
    <div class="index-news">
      <div class="index-news-left fl">
        <dl class="index-news-list">
          <dt class="index-title">
            <b class="iconfont icon-news">{{ articles.news1.typeName }}</b>
            <a v-on:click="newsSortGo(articles.news1.typeName)">更多》</a>
          </dt>
          <dd class="index-news-img">
            <img src="../assets/images/index-news4.jpg" alt="">
          </dd>
          <dd class="index-news-item" v-for="(article,index) in latestNews.slice(0,7)">
            <a @click='newsDetailGo(article.guid,articles.news1.typeName)' class="displayflex">
              <p class="flex1">{{ article.title }}</p>
              <i>{{ article.createTime | getYMD }}</i>
            </a>
          </dd>
        </dl>
      </div>
      <div class="index-news-right fr">
        <dl class="index-news-list">
          <dt class="index-title">
            <b class="iconfont icon-regulation">{{ articles.news2.typeName }}</b>
            <a v-on:click="newsSortGo(articles.news2.typeName)">更多》</a>
          </dt>
          <dd class="index-news-item" v-for="(article,index) in regulation.slice(0,5)">
            <a @click='newsDetailGo(article.guid,articles.news2.typeName)' class="displayflex">
              <p class="flex1">{{ article.title }}</p>
              <i>{{ article.createTime | getYMD }}</i>
            </a>
          </dd>
        </dl>
        <dl class="index-news-list">
          <dt class="index-title">
            <b class="iconfont icon-activity">{{ articles.news3.typeName }}</b>
            <a v-on:click="newsSortGo(articles.news3.typeName)">更多》</a>
          </dt>
          <dd class="index-news-item" v-for="(article,index) in summit.slice(0,5)">
            <a @click='newsDetailGo(article.guid,articles.news3.typeName)' class="displayflex">
              <p class="flex1">{{ article.title }}</p>
              <i>{{ article.createTime | getYMD }}</i>
            </a>
          </dd>
        </dl>
      </div>
    </div>

    <div class="index-supplier">
      <!-- <div class="index-supplier-left index-supplier-con fl">
        <h2>平台货主入口</h2>
        <div class="index-supplier-list">
          <a>系统下单</a>
          <a>找物流资源</a>
          <a>找三方仓储资源</a>
          <a>物流订单查询</a>
        </div>
      </div> -->
      <div class="index-supplier-right index-supplier-con fr">
        <!--<h2>已入驻药企</h2>-->
        <div class="index-title" style="margin: 14px 20px 0">
          <b class="iconfont icon-company">已入驻药企</b>
        </div>
        <div class="index-supplier-header">
          <p></p>
          <p>企业名称</p>
          <p>注册地</p>
          <p>入驻平台时间</p>
        </div>
        <div class="swiper-container table-supplier">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(medicine, index) in medicines" :key="index">
              <div class="table-row">
                <p><b class="rela-img">
                   <img v-if="medicine.PictContent" :src="getYaoQiImage(medicine.PictContent)">
                   <img v-else src="../assets/images/default-img.png">
                  </b></p>
                <p><b>{{ medicine.ChineseName }}</b></p>
                <p>{{ medicine.Address }}</p>
                <p>{{ medicine.EnterDate  | getYMD}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 平台试点企业 -->
    <div class="index-pilot-enterprise">
      <div class="index-title">
        <b class="iconfont icon-company">平台试点企业</b>
      </div>
      <div class="swiper-container enterprise-info">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(company, index) in companys" :key="index">
            <div class="rela-img"><img :src="company.path" :title="company.name"></div>
            <p>{{ company.name }}</p>
            <!-- <p>涉药运输评级：<span>{{transport.Grade}}</span></p> -->
            <p class="rating">涉药运输评级：<span>待评定</span></p>
            <a :href="company.url">查看详情</a>
          </div>
          <div class="swiper-slide">
            <p class="not-open">持续新增中 · · ·</p>
          </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>

    <div class="index-transport-branch">
      <div class="index-branch-list fl">
        <div class="index-title">
          <b class="iconfont icon-car">全国医药运力网</b>
          <span v-if="$store.state.user.LoginType" @click="showRegister">入驻运力网</span>
          <router-link to="/capacity/null">更多》</router-link>
        </div>
        <ul>
          <li v-for="transport in transports" class="index-branch-item">
            <div class="index-branch-img rela-img fl">
              <img v-if="transport.PictContent && transport.PictContent!='[]'&&transport.PictContent!='null'" :src="transport.PictContent | imgurl(transport.PlatformType)">
              <img v-else src="../assets/images/default-img.png">
            </div>
            <div class="index-branch-text fl">
              <b>{{ transport.Name}}</b>
              <!--<p>涉药运输评级：<span>{{transport.Grade}}</span></p>-->
              <p>涉药运输评级：<span>待评定</span></p>
              <a v-on:click="transportPush(transport.TenantGuid)">详情</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="index-branch-map fr">
        <h3>运力分布</h3>
        <div class="rela-img" @click="handleCapacity()">
          <img src="../assets/images/index-car-map.png" alt="">
        </div>
      </div>
    </div>

    <div class="index-warehouse-branch">
      <div class="index-branch-list fl">
        <div class="index-title">
          <b class="iconfont icon-warehouse">全国医药仓储网</b>
          <span v-if="$store.state.user.LoginType" @click="showRegister">入驻医药仓储网</span>
          <router-link to="/warehouse/null">更多》</router-link>
        </div>
        <ul>
          <li v-for="transport in Warehouses" class="index-branch-item">
            <div class="index-branch-img rela-img fl">
              <img v-if="transport.CorpPict!='[]' && transport.CorpPict && transport.CorpPict!='null'" :src="getImage(transport.CorpPict)">
              <img v-else src="../assets/images/default-img.png">
            </div>
            <div class="index-branch-text fl">
              <b>{{transport.CorpName }}</b>
              <p>
                仓库总面积：<span>{{transport.TotalAreaAge | amount}}平米</span>
              </p>
              <a v-on:click="WareHousePush(transport.CorpGuid)">详情</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="index-branch-map fr">
        <h3>仓储分布</h3>
        <div class="rela-img" @click="handleWarehouse()">
          <img src="../assets/images/index-warehouse-map.png" alt="">
        </div>
      </div>
    </div>

    <div class="index-advertising">
      <a href="http://www.csbr.cn/" target="_blank"><img src="../assets/images/index-ad.jpg" alt="深圳传世般若科技有限公司"></a>
    </div>

    <div class="index-solution">
      <div class="index-title2">
        <h1>我们能为你做什么</h1>
        <p>WE CAN DO FOR YOU</p>
        <b>涉药运输物流综合解决方案</b>
      </div>
      <div class="index-solution-con">
        <ul>
          <li v-for="(solution, index) in solutions" :key="index"> <!-- @click="handleSolution(index)" -->
            <router-link class="rela-img" :to="solution.solutionUrl">
              <img :src="solution.path">
            </router-link>
            <p>{{ solution.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="index-about">
      <div class="index-title2">
        <h1>平台介绍</h1>
        <p>introduce</p>
      </div>
      <div class="index-about-con">
        <div class="index-about-img rela-img fl">
          <img src="../assets/images/index-about.jpg">
        </div>
        <div class="index-about-text fl">
          <p>医药四方云（涉药运输服务平台）是由中国交通运输协会快运分会、中国医药商业协会社会医药物流分会，委托深圳传世般若科技有限公司根据《涉药运输企业医药物流质量及服务能力评估标准》（简称“标准”）、《药品经营质量管理规范》（简称“GSP”）、《新版GSP药品运输标准操作规程》等的相关要求，由深圳传世般若科技有限公司运营……</p>
          <!-- <p>药监研究会涉药运输标准示范平台<br>中国医药商业协会社会医药物流分会指定平台单位</p> -->
          <router-link to="/about">更多 》</router-link>
        </div>
      </div>
    </div>

    <div class="index-link displayflex">
      <span>友情链接：</span>
      <p class="flex1">
        <a href="http://www.capc.org.cn/" target="_blank">中国医药商业协会</a>
        <a href="http://www.moh.gov.cn/" target="_blank">国家卫生健康委员会</a>
        <a href="http://www.cncsdr.org/" target="_blank">中国药品监督管理研究会</a>
        <a href="http://www.cmw-gov.cn/" target="_blank">国家健康产业公共服务平台</a>
        <a href="http://samr.cfda.gov.cn/" target="_blank">国家食品药品监督管理总局</a>
        <a href="http://www.fapiao.cn/" target="_blank">全国电子票据公共服务平台</a>
        <a href="http://www.gsxt.gov.cn/" target="_blank">国家企业信用信息公示系统</a>
        <a href="http://www.ndrc.gov.cn/" target="_blank">国家发改委</a>
        <a href="https://www.csbr.cn/" target="_blank">深圳传世般若科技有限公司</a>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from "swiper";

export default {
  data() {
    return {
      show: {},
      Cardata: {},
      theme1: "light",
      activeName: 1,
      value1: 0,
      banners: [
        {
          path: require("@/assets/images/banner1.png")
        },
        {
          path: require("@/assets/images/banner2.png")
        },
        {
          path: require("@/assets/images/banner3.jpg")
        },
        {
          path: require("@/assets/images/banner4.jpg")
        }
      ],
      autoplaySpeed: 3000,
      transports: [],
      Warehouses: [],
      articles: {
        news1: {},
        news2: {},
        news3: {}
      },
      latestNews: [],
      regulation: [],
      summit: [],
      solutions: [
        {
          path: require("@/assets/images/index-solution1.jpg"),
          name: "物流供应链信息化解决方案",
          solutionUrl: '/solution'
        },
        {
          path: require("@/assets/images/index-solution2.jpg"),
          name: "四方物流运营",
          solutionUrl: '/solution2'
        },
        {
          path: require("@/assets/images/index-solution3.jpg"),
          name: "供应链金融",
          solutionUrl: '/solution3'
        }
      ],
      value2: 0,
      companys: [
        {
          path: require("@/assets/images/enterprise-logo.jpg"),
          name: "上海佳吉快运有限公司",
          url: "https://www.yao4pl.com/#/jiaji"
        },
        {
          path: require("@/assets/images/enterprise-logo2.png"),
          name: "陕西天士力医药物流有限公司",
          url: "https://www.yao4pl.com/#/tsl"
        }
      ],
      imgurlcangm: "",
      imgurlcs4pl: "",
      medicines: [
        {
          PictContent: "",
          ChineseName: "",
          Address: "",
          EnterDate: ""
        }
      ]
    };
  },
  computed: {
    loginUrl() {
      //从顶部点击了登录按钮，直接跳转到登录页面，登录成功后不返回
      return `${this.apiUrls.loginUrl.baseURL}`;
    },
    LoginCtaUrl() {
      return `${this.apiUrls.CtaUrl.baseURL}`;
    },
    loginName() {
      return this.$store.state.user.Name;
    },
    YaoQiUrl() {
      return `${this.apiUrls.yaoqiURL.baseURL}`;
    }
  },
  methods: {
    navUrl(name) {
      if (name == 1) {
        this.$store.commit("navIndex", 1);
        this.$router.push(`/index`);
      } else if (name == 2) {
        this.$store.commit("navIndex", 2);
        this.$router.push(`/news/null`);
      } else if (name == 3) {
        this.$store.commit("navIndex", 3);
        this.$router.push(`/capacity/null`);
      } else if (name == 4) {
        this.$store.commit("navIndex", 4);
        this.$router.push(`/warehouse/null`);
      } else if (name == 5) {
        this.$store.commit("navIndex", 5);
        this.$router.push(`/solution`);
      } else if (name == 6) {
        this.$store.commit("navIndex", 6);
        this.$router.push(`/about`);
      }
    },
    getImage(pict) {
      if (pict && pict != "null") {
        try {
          let imgSrc = JSON.parse(pict);
          let img =
            imgSrc.Original.StorageMode == "obs"
              ? imgSrc.Original.Url + (imgSrc.Original.Name || "")
              : "https://www.csyaoly.com/uploadfiles/" +
                (imgSrc.Original.Name || "");
          return img;
        } catch (e) {}
        //这里的地址指向药链2.0的服务
        return (
          "https://www.csyaoly.com/uploadfiles/" + pict.split("\\").join("/")
        );
      }
      return "";
    },
    getYaoQiImage(pict) {
      if (pict) {
        //这里的地址指向传世心经的服务
        return "http://heart.csbr.cn/uploadfiles/" + pict.split("\\").join("/");
      }

      return "";
    },
    showRegister() {
      this.$router.push(`/register`);
    },
    showProbationRegister(){
      this.$router.push(`/probationRegister`);
    },
    getCarrData() {
      let url = "/api/csxj/transport";

      let data = {
        PageSize: 6
      };
      this.$http
        .post(url, data, this.apiUrls.yaoqiURL)
        .then(c => {
          console.log(c, '全国医药运力网')
          this.transports = c.datas;
          this.show.transport = c.total
        });

      // 平台车辆总数
      let self = this;
      this.$http
        .post("/api/csxj/transportsum", {}, this.apiUrls.yaoqiURL)
        .then(function(res) {
          self.Cardata = res.datas[0];
        });
    },
    GetWareHouseData() {
      let url = "api/csxj/orderwarehouse";
      let data = {
        PageIndex: 1,
        PageSize: 2000
      };
      let self = this;
      this.axios.post(url, data, this.apiUrls.yaoqiURL).then(function(res) {
        self.Warehouses = res.datas;
      });

      //仓库总面积
      this.$http
        .post("/api/csxj/warehousealliance", data, this.apiUrls.yaoqiURL)
        .then(function(res) {
          let sum = res.datas.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.TotalAreaAge;
          }, 0);
          self.show.totalArea = sum;
          self.show.warehouse = res.total;
        });
    },
    // 获取新闻分类
    getNewsClass() {
      let self = this;
      let url = "/cms/informationType/list";
      this.axios.post(url, {}, this.apiUrls.cmsurl).then(function(c) {
        self.articles.news1 = c.data[0];
        self.articles.news2 = c.data[1];
        self.articles.news3 = c.data[2];
        self.getNewsData(self.articles.news1.guid, "1");
        self.getNewsData(self.articles.news2.guid, "2");
        self.getNewsData(self.articles.news3.guid, "3");
      });
    },
    // 获取新闻数据
    getNewsData(typeString, modules) {
      let self = this;
      let url = "/cms/information/list";
      let data = {
        pageSize: 7,
        type: typeString
      };
      this.axios.post(url, data, this.apiUrls.cmsurl).then(function(res) {
        if (modules == "1") {
          self.latestNews = res.data.list;
          self.latestNews.sort((a, b) => {
            let aTimeString = a.createTime;
            let bTimeString = b.createTime;
            return bTimeString - aTimeString;
          });
        } else if (modules == "2") {
          self.regulation = res.data.list;
          self.regulation.sort((a, b) => {
            let aTimeString = a.createTime;
            let bTimeString = b.createTime;
            return bTimeString - aTimeString;
          });
        } else {
          self.summit = res.data.list;
          self.summit.sort((a, b) => {
            let aTimeString = a.createTime;
            let bTimeString = b.createTime;
            return bTimeString - aTimeString;
          });
        }
      });
    },
    // 新闻列表页
    newsSortGo(name) {
      this.$router.push(`/news/${name}`);
    },
    // 新闻详情页
    newsDetailGo: function(guid, utypename) {
      this.$router.push(`/newsDetail/${guid}/${utypename}`);
    },
    transportPush(guid) {
      this.$router.push(`/capacity/${guid}`);
    },
    WareHousePush(guid) {
      this.$router.push(`/warehouse/${guid}`);
    },
    // 解决方案
    // handleSolution(index) {
    //   this.$router.push({
    //     path: "solution",
    //     query: {
    //       index: index
    //     }
    //   });
    // },
    LoginLoad() {
      const self = this;
      if (self.$store.state.user.LoginType) {
        if (window.location.href.indexOf("?") != -1) {
          var uid = window.location.href
            .split("?")[1]
            .split("&")[0]
            .replace("uid=", "");

          setTimeout(() => {
            this.$http
              .post(`/api/LoginValidate/GetLoginValidate?uid=${uid}`)
              .then(function(rs) {
                if (rs.message == "Y") {
                  self.$Message.success("登录成功");
                  self.$store.commit("logOn", {
                    Name: self.loginName,
                    TenantGuid: rs.value,
                    LoginType: false
                  });
                }
              });
          }, 2000);
        }
      }
    },
    Exit() {
      this.$store.commit("logOff");
      this.$router.push({ path: "/index" });
    },
    getYsoqi() {
      const self = this;
      this.$http
        .post(self.YaoQiUrl + "/api/csxj/mfcorpenter")
        .then(function(rs) {
          console.log(rs, '药企')
          self.medicines = rs.datas;
          self.$nextTick(function() {
            new Swiper(".table-supplier", {
              loop: true,
              slidesPerView: 3,
              slidesPerGroup: 1,
              autoplay: {
                delay: 2000,
                disableOnInteraction: false
              },
              direction: "vertical"
            });
          }),
            (self.show.yaoqi = rs.total);
        });
    },
    handleCapacity() {
      this.$router.push(`/capacity/null`);
    },
    handleWarehouse() {
      this.$router.push(`/warehouse/null`);
    },
    evaluate() {
      /*单击了自评按钮，如果登录了跳转到自评页面，未登录就跳转到登录页面*/
      if (this.$store.state.user.LoginType == true) {
        window.location.href = "http://yao4pl.com/cta/evaluation/index";
        //window.location.href = 'http://192.168.2.89:9391/Logistics/Trtpltenantflow/CloudCarrierLogisticsTransitDataIndex';
      } else {
        window.location.href = `${this.apiUrls.loginUrl.baseURL}` + 'NavigateValue=http://yao4pl.com/cta/evaluation/index';
      }
    }
  },
  mounted() {
    this.getYsoqi();
    this.LoginLoad();
    this.getCarrData();
    this.GetWareHouseData();
    this.getNewsClass();
    this.imgurlcs4pl = this.imgurl.cs4pl;
    this.imgurlcangm = this.imgurl.cangm;
    new Swiper(".enterprise-info", {
      loop: false,
      slidesPerView: 3,
      slidesPerGroup: 1,
      // loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }
};
</script>
<style scoped>
.index-menu-entry {
  text-align: right;
}
.index-menu-entry li {
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
.index-menu-entry li a {
  color: #fff;
}
.index-menu-entry li.login {
  height: 30px;
  line-height: 28px;
  font-size: 16px;
  color: #4aa8e5;
  background: #fff;
}
.index-menu-entry li.logged {
  position: relative;
  border: 0;
}
.index-menu-entry li span::before {
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
  z-index: 3;
}
.logout-box a {
  display: block;
  line-height: 32px;
  color: #333 !important;
}
.logout-box a:hover {
  color: #4aa8e5 !important;
}
.index-menu-entry li:hover .logout-box {
  display: block;
}
.ivu-menu-horizontal {
  height: 48px;
  line-height: 48px;
}
.ivu-menu-light {
  background: transparent;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  height: 0;
}
.ivu-menu-item {
  font-size: 20px;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
  color: #fff;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
  border-bottom: 1px solid #fff;
}
.index-pilot-enterprise {
  height: 250px;
  background: #fff;
  padding: 14px 20px;
  margin-bottom: 30px;
}
.enterprise-info {
  padding: 10px 110px 0;
}
.enterprise-info .swiper-slide{
  width: 280px !important;
  height: 150px;
  background: #f6fbfe;
  text-align: center;
  margin: 0 20px;
  padding: 10px 0;
}
.enterprise-info .swiper-slide .rela-img{
  width: 90px;
  height: 44px;
  margin: 0 auto 7px;
}
.enterprise-info .swiper-slide p{
  line-height: 26px;
  font-size: 16px;
  color: #333;
}
.enterprise-info .swiper-slide p.rating{
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 5px;
}
.enterprise-info .swiper-slide p.not-open{
  line-height: 130px;
}
.enterprise-info .swiper-slide a{
  display: inline-block;
  width: 80px;
  height: 24px;
  line-height: 22px;
  font-size: 14px;
  color: #4aa8e5;
  border: 1px solid #4aa8e5;
  border-radius: 8px;
}
.enterprise-info .swiper-slide a:hover{
  color: #fff;
  background: #4aa8e5;
}
.enterprise-info .swiper-button-prev{
  left: 40px;
}
.enterprise-info .swiper-button-next{
  right: 40px;
}
</style>

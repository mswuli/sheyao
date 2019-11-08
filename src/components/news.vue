<template>
<div>
  <c-menu></c-menu>
  <div class="inner-banner">
    <img src="../assets/images/banner-news.jpg" alt="">
  </div>
  <div class="inner-news inner-wrap">
    <div class="news-menu">
      <a
        v-for="(tab, index) in tabs"
        :class="{active : index == activeTab}"
        @click="handleItem(tab.title, index)">
        {{ tab.title }}
      </a>
    </div>
    <div class="breadcrumb">
      <h2>{{ typeName }}</h2>
      <span>当前位置：{{ typeName }}</span>
    </div>
    <div class="news-content">
      <div v-show="activeTab == 0">
        <dl v-for="item in latestNews.list" class="news-content-list">
          <dt>
              <a @click='newsDetailGo(item.guid)' class="over-wrap">{{ item.title }}</a>
              <p class="over-wrap">{{ item.label }}</p>
            </dt>
          <dd>
            <p>
              <span>{{ item.createTime | getMD }}</span>
              <i>{{ item.createTime | getYear }}</i>
            </p>
            <a @click='newsDetailGo(item.guid)'></a>
          </dd>
        </dl>
        <div class="list-more" v-if="$store.state.user.LoginType==false">
          <a :href="loginUrl">查看更多</a>
        </div>
        <!-- current:当前页码，page-size:每页条数，total:数据总数 -->
        <div v-else>
          <Page show-total
            :current="latestNews.pageNo"
            :page-size="latestNews.pageSize"
            :total="latestNews.total"
            @on-change="GetNewDataType1"></Page>
        </div>
      </div>
      <div v-show="activeTab == 1">
        <dl v-for="item in regulation.list" class="news-content-list">
          <dt>
              <a @click='newsDetailGo(item.guid)' class="over-wrap">{{ item.title }}</a>
              <p class="over-wrap">{{ item.label }}</p>
            </dt>
          <dd>
            <p>
              <span>{{ item.createTime | getMD }}</span>
              <i>{{ item.createTime | getYear }}</i>
            </p>
            <a @click='newsDetailGo(item.guid)'></a>
          </dd>
        </dl>
        <div class="list-more" v-if="$store.state.user.LoginType==false">
          <a :href="loginUrl">查看更多</a>
        </div>
        <!-- current:当前页码，page-size:每页条数，total:数据总数 -->
        <div v-else>
          <Page show-total
            :current="regulation.pageNo"
            :page-size="regulation.pageSize"
            :total="regulation.total"
            @on-change="GetNewDataType2"></Page>
        </div>
      </div>
      <div v-show="activeTab == 2">
        <dl v-for="item in summit.list" class="news-content-list">
          <dt>
              <a @click='newsDetailGo(item.guid)' class="over-wrap">{{ item.title }}</a>
              <p class="over-wrap">{{ item.label }}</p>
            </dt>
          <dd>
            <p>
              <span>{{ item.createTime | getMD }}</span>
              <i>{{ item.createTime | getYear }}</i>
            </p>
            <a @click='newsDetailGo(item.guid)'></a>
          </dd>
        </dl>
        <div class="list-more" v-if="$store.state.user.LoginType==false">
          <a :href="loginUrl">查看更多</a>
        </div>
        <!-- current:当前页码，page-size:每页条数，total:数据总数 -->
        <div v-else>
          <Page show-total
            :current="summit.pageNo"
            :page-size="summit.pageSize"
            :total="summit.total"
            @on-change="GetNewDataType3"></Page>
        </div>
      </div>
    </div>
  </div>
  <c-login :showLogin="showLoginDia" @resetVal="resetValf"></c-login>
</div>
</template>

<script>
import Cmenu from './common/menu.vue'

export default {
  components: {
    "c-menu": Cmenu
  },
  data() {
    return {
      articles: {
        news1: {},
        news2: {},
        news3: {}
      },
      latestNews:[],
      regulation:[],
      summit:[],
      tabs: [
        {
          isActive: true
        },
        {
          isActive: false
        },
        {
          isActive: false
        },
      ],
      activeTab: 0,
      typeName: '',
      showLoginDia: false,
    }
  },
  mounted() {
    this.getNewsClass();
    this.$store.commit('navIndex', 2);
  },
  methods: {
    showLogin() {
      this.showLoginDia = true;
    },
    resetValf() {
      this.showLoginDia = false;
    },
    // 新闻选项卡
    handleItem(tab, index) {
      this.activeTab = index;
      this.typeName = tab;
    },
    // 获取新闻分类
    getNewsClass() {
      let self = this;
      let url = "/cms/informationType/list";
      this.axios.post(url, {}, this.apiUrls.cmsurl)
        .then(function(c) {
          self.articles.news1 = c.data[0];
          self.articles.news2 = c.data[1];
          self.articles.news3 = c.data[2];
          self.getNewsData(self.articles.news1.guid, "1");
          self.getNewsData(self.articles.news2.guid, "2");
          self.getNewsData(self.articles.news3.guid, "3");
          self.typeName = self.tabs[0].title = c.data[0].typeName;
          self.tabs[1].title = c.data[1].typeName;
          self.tabs[2].title = c.data[2].typeName;

          let name = self.$route.params.name;
          if(name){
            for(let i=0;i<c.data.length;i++){
              if(name == c.data[i].typeName){
                console.log(c.data[i]);
                self.handleItem(c.data[i].typeName,i);
                return;
              }
            }

          }
        })
    },
    // 获取新闻数据
    getNewsData(typeString,modules,pagesiae) {
      let self = this;
      let url = "/cms/information/list";
      let data = {
        pageSize: 10,
        pageNo: pagesiae,
        type: typeString
      };

      this.axios
        .post(url, data, this.apiUrls.cmsurl)
        .then(function(res) {
          if (modules == "1") {
            self.latestNews = res.data;
            self.latestNews.list.sort((a, b) => {
              let aTimeString = a.createTime;
              let bTimeString = b.createTime;
              return bTimeString - aTimeString
            })
          } else if (modules == "2") {
            self.regulation = res.data;
            self.regulation.list.sort((a, b) => {
              let aTimeString = a.createTime;
              let bTimeString = b.createTime;
              return bTimeString - aTimeString
            })
          } else {
            self.summit = res.data;
            self.summit.list.sort((a, b) => {
              let aTimeString = a.createTime;
              let bTimeString = b.createTime;
              return bTimeString - aTimeString
            })
          }
        })
    },
    // 新闻详情页
    newsDetailGo: function(guid) {
      this.$router.push(`/newsDetail/${guid}/${this.typeName}`);
    },
    // 新闻列表分页
    GetNewDataType1(pageNo){
      this.getNewsData(this.articles.news1.guid, "1",pageNo);
    },
    GetNewDataType2(pageNo){
      this.getNewsData(this.articles.news2.guid, "2",pageNo);
    },
    GetNewDataType3(pageNo){
      this.getNewsData(this.articles.news3.guid, "3",pageNo);
    }
  },
  computed: {
    loginUrl() {
      return `${this.apiUrls.loginUrl.baseURL}NavigateValue=${location.href}`;
    },
  },
  watch: {

  },
  created() {
    this.getNewsData();
  },
  activated() {
    this.getNewsData();
  }
}
</script>

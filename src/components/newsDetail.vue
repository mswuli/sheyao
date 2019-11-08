<template>
<div>
  <c-menu :activeNav="1"></c-menu>
  <div class="news-detail-wrap inner-wrap">
    <div class="breadcrumb">
      <h2>{{ typeName }}</h2>
      <span>当前位置：{{ typeName }}
          <router-link to="/news">返回</router-link>
        </span>
    </div>
    <div class="news-detail">
      <div class="news-detail-title">
        <h2>{{ details.title }}</h2>
        <p>发布时间：{{ details.createTime | getYMD }}</p>
      </div>
      <div class="news-detail-content">
        <p v-html="details.content"></p>
      </div>
      <div class="news-detail-link">
        <p>【上一篇】：<a @click='prevDetailGo(details.lastGuid)'>{{ details.lastTitle }}</a></p>
        <p>【下一篇】：<a @click='nextDetailGo(details.nextGuid)'>{{ details.nextTitle }}</a></p>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Cmenu from "@/components/common/menu.vue";

export default {
  components: {
    "c-menu": Cmenu
  },
  data() {
    return {
      details: {},
      typeName: ''
    }
  },
  methods: {
    getData(){
      var self = this;

      this.axios.get('/cms/information/' + this.$route.params.guid,this.apiUrls.cmsurl)
      .then(function(res){
          self.details = res.data;
      })
    },
    prevDetailGo: function(lastGuid) {
      this.$router.push(`/newsDetail/${lastGuid}/${this.typeName}`)
    },
    nextDetailGo: function(nextGuid) {
      this.$router.push(`/newsDetail/${nextGuid}/${this.typeName}`)
    }
  },
  mounted() {
    this.$store.commit('navIndex', 2);
    this.getData();
    this.typeName = this.$route.params.typeName;
  },
  watch: {
    $route(){
      this.getData()
    }
  }
}
</script>
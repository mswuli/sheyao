<template>
<div id="app">
  <router-view></router-view>
  <c-footer v-if="$route.meta.keepAlive"></c-footer>
  <c-login v-if="$route.meta.keepAlive"></c-login>
  <c-back-top v-if="$route.meta.keepAlive"></c-back-top>
</div>
</template>

<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a345aa1a7dff53ce37e2a729094913cb";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

export default {
  name: 'App',
  watch:{
    //页面切换效果
    '$route':function(to, from){
      //title名字
      document.title = this.$route.name;
    },
  },
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>

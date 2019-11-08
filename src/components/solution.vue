<template>
<div>
  <c-menu></c-menu>
  <div class="inner-banner">
    <img src="../assets/images/banner-about2.jpg">
  </div>
  <div class="solution-wrap">
    <div class="inner-title" ref="solution1">
      <h1>信息化解决方案</h1>
      <h3>Information solution</h3>
    </div>
    <div class="solution-content1 solution-content">
      <div class="inner-wrap">
        <div class="solution-content-left">
          <div class="solution-title">
            <img src="../assets/images/solution-logo1.png">
            <p>平台的解决方案和服务</p>
            <span>企业物流整体解决方案</span>
          </div>
          <img src="../assets/images/solution-img2.png" style="margin: 50px 0 0 70px;">
        </div>
        <div class="solution-content-right">
          <div class="solution-content-list solution-content-list2">
            <dl>
              <dt>全链路信息化集成</dt>
              <dd>
                <p>物流信息化建设与物流体系整合</p>
                <p>物流中心建设集成：项目立项、规划设计、建设实施、运行上线、验收评估</p>
              </dd>
            </dl>
            <dl>
              <dt>第四方物流运营</dt>
              <dd>
                <p>库存前置、渠道下沉</p>
                <p>多仓联动、多式联运</p>
                <p>全程订单调度及管理</p>
                <p>全程仓储及承运资源管理</p>
              </dd>
            </dl>
            <dl>
              <dt>供应链金融服务</dt>
              <dd>
                <p>大数据：企业供应链大数据服务，辅助金融机构评估</p>
                <p>供应链金融：基于供应链大数据提供应收融资、预付融资、ABS等服务</p>
              </dd>
            </dl>
            <dl>
              <dt>全程冷链解决方案</dt>
              <dd>
                <p>利用冷链信息平台，集成先进冷链技术和设备</p>
                <p>根据客户需要，提供全过程冷链解决方案</p>
              </dd>
            </dl>
          </div>
          <h2>企业智慧全供应链服务</h2>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Cmenu from '@/components/common/menu.vue';

export default {
  components: {
    'c-menu': Cmenu
  },
  date() {
    return {

    }
  },
  mounted(){
    // var cs = this.$route.query.index;
    // var topHeight1 = this.$refs.solution1.getBoundingClientRect().top;
    // var topHeight2 = this.$refs.solution2.getBoundingClientRect().top;
    // var topHeight3 = this.$refs.solution3.getBoundingClientRect().top;
    // if(cs == 0){
    //   $("html, body").scrollTop(topHeight1)
    // }else if(cs == 1){
    //   $("html, body").scrollTop(topHeight2)
    // }else if(cs == 2){
    //   $("html, body").scrollTop(topHeight3)
    // }

    var topHeight1 = this.$refs.solution1.getBoundingClientRect().top;
    $("html, body").scrollTop(topHeight1)

    this.$store.commit('navIndex', 5);
  }
}
</script>
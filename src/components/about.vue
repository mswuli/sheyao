<template>
  <div>
    <c-menu></c-menu>
    <div class="inner-banner">
      <img src="../assets/images/banner-about2.jpg" alt="">
    </div>
    <div class="about-wrap">
      <div class="inner-title">
        <h1>平台介绍</h1>
        <h3>Introduce</h3>
      </div>
      <div class="about-content">
        <div class="inner-wrap">
          <p>医药四方云（涉药运输服务平台）是由中国交通运输协会快运分会、中国医药商业协会社会医药物流分会，委托深圳传世般若科技有限公司根据《涉药运输企业医药物流质量及服务能力评估标准》（简称“标准”）、《药品经营质量管理规范》（简称“GSP”）、《新版GSP药品运输标准操作规程》等的相关要求，由深圳传世般若科技有限公司运营的全国涉药运输服务平台。</p>
          <p>全国涉药运输服务平台专注为医药生产企业、医药流通企业、涉药物流企业提供信息技术、信息咨询、供应链金融以及企业宣传等服务，范围主要涵盖以下方面：</p>
          <p><b>信息技术服务，提供系统支持</b></p>
          <p>为平台会员提供信息化解决方案和系统支持。</p>
          <p><b>涉药物流标准咨询，提升企业物流服务能力</b></p>
          <p>为医药物流企业提供涉药物流标准咨询，助力物流企业达到涉药物流标准。</p>
          <p><b>展示平台搭建，提供交流服务</b></p>
          <p>搭建医药生产企业、医药流通企业、医药物流企业之间的自我展示平台，主办权威的行业高峰论坛和趋势研讨会等，为会员提供沟通、交流的平台。</p>
          <p>平台技术支持方：深圳传世般若科技有限公司成立于2015年7月，是市场上领先的医药供应链互联网技术公司，拥有丰富的医药行业供应链信息化解决方案及四方物流运营经验，致力于以信息科技驱动供应链创新，让医药流通更高效、更智能、更可靠。同时传世科技也是国家健康医疗大数据供应链平台建设及“互联网+医疗”重大试点工程建设的供应链平台建设的合作单位。</p>
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
    date () {
      return {

      }
    },
    mounted() {
      this.$store.commit('navIndex', 6);
    },
  }
</script>
<style scoped>
  .about-content p b::before{
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #333;
    vertical-align: middle;
    margin-right: 5px;
  }
</style>

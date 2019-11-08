<template>
<div>
  <c-menu></c-menu>
  <div class="problem-wrap">
    <div class="inner-title">
      <h1>商务咨询</h1>
      <h3>Business inquiries</h3>
    </div>
    <div class="business-content">
      <div class="inner-wrap">
        <h2>商务咨询流程：</h2>
        <ul class="business-process">
          <li>
            <b>1</b>
            <p>客户电话咨询</p>
          </li>
          <li>
            <b>2</b>
            <p>工作人员问题解答</p>
          </li>
          <li>
            <b>3</b>
            <p>客户需求跟进</p>
          </li>
          <li>
            <b>4</b>
            <p>后期回访</p>
          </li>
        </ul>
        <h2>开通平台账号流程：</h2>
        <ul class="account-process">
          <li>
            <div>
              <b>1</b>
              <p>企业与平台完成协议签署</p>
            </div>
          </li>
          <li>
            <div>
              <b>2</b>
              <p>签署企业资料提供</p>
            </div>
          </li>
          <li>
            <div>
              <b>3</b>
              <p>平台完成账号开通</p>
            </div>
          </li>
          <li>
            <div>
              <b>4</b>
              <p>平台培训及问题解答</p>
            </div>
          </li>
          <li>
            <div>
              <b>5</b>
              <p>企业使用平台</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
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

    }
  },
  mounted() {
    this.$store.commit('navIndex', 0);
  },
}
</script>
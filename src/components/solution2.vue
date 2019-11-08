<template>
<div>
  <c-menu></c-menu>
  <div class="inner-banner">
    <img src="../assets/images/banner-about2.jpg">
  </div>
  <div class="solution-wrap">
    <div class="inner-title" ref="solution2">
      <h1>四方运营</h1>
      <h3>Quartet operation</h3>
    </div>
    <div class="solution-content">
      <div class="inner-wrap">
        <div class="solution-content-left">
          <div class="solution-title">
            <img src="../assets/images/solution-logo2.png">
            <p>平台的解决方案和服务</p>
            <span>企业物流整体解决方案</span>
            <p>— 第四方物流运营</p>
          </div>
          <div class="quartet-operation-left">
            <div class="quartet-operation-left-text">
              <p>传世四方云是物流资源的调配平台，<br>为社会化物流资源提供解决方案，符合涉药物流标准，<br>链接货主与物流公司，为货主提供丰富的合规社会化物流资源，<br>实现多货主、多物流资源、多仓储资源统一的四方运营。</p>
            </div>
            <div class="quartet-operation-left-text">
              <b>四方运营体系</b>
              <p>管理企业内部物流资源，当企业内部资源不足时，<br>四方云平台提供物流资源与仓储资源；</p>
              <img src="../assets/images/solution-img3.png" style="margin-top: 20px;">
            </div>
          </div>
        </div>
        <div class="solution-content-right quartet-operation-right">
          <div class="quartet-operation-left-text">
            <b>传世四方运营与传统运营的区别</b>
            <img src="../assets/images/solution-img4.png">
          </div>
          <div class="quartet-operation-left-text">
            <b>传世云仓</b>
            <p>传世与第三方医药物流公司深度合作，在全国10个以上省市搭建了仓盟网络，<br>支持医药企业库存前移和物流渠道下沉需求，以满足两票制、异地设仓的政策要求。</p>
            <ul>
              <li>传世云仓体系：</li>
              <li>- 东北、华北、西北、西南、华中、华东、东南、华南八大片区布局；</li>
              <li>- 共计40个城市，总可调度面积100万平方米的三方GSP药仓；</li>
              <li>- 支持医药企业库存前移和物流渠道下沉需求；</li>
              <li>- 满足两票制、异地设仓的政策要求。</li>
            </ul>
          </div>
          <div class="quartet-operation-left-text">
            <b>传世运力网</b>
            <p>在全国40个省市搭建集散地管理中心，<br>平台合作数百家物流公司，<br>可直接调度500多个车队。</p>
            <ul>
              <li>可提供的服务包括：</li>
              <li>- 干线运输中转功能；</li>
              <li>- 城际配送调度功能；</li>
              <li>- 集货中心；</li>
              <li>- 增值服务中心；</li>
              <li>- 逆向物流管理中心；</li>
              <li>通过以上服务内容，加强全国配送能力，提高配送服务质量。</li>
            </ul>
          </div>
        </div>
        <div class="quartet-operation-left-text">
          <b class="quartet-operation-left">行业价值</b>
          <div class="solution-content-left quartet-operation-left">
            <p>A  配送过程全程可视化。四方云平台实现实时可视化与统计可视化，可以直观监控整个配送过程，实现冷链监管无盲点；</p>
            <p>B  降低物流配送成本。通过借助传世四方运力网，可以重构配送体系，降低成本同时，保障物流配送质量，提高客户满意度；</p>
          </div>
          <div class="solution-content-right quartet-operation-right">
            <p>C  强化物流运输管理力度。运力网在全国建设中转管理中心，可以强化省内配送的监管力度，有效地保障支线运输地质量；</p>
            <p>D  支持企业物流渠道下沉。随着两票制、异地设仓等政策地出台，企业地物流渠道下沉倾向日益加强，传世四方运营可以支撑企业低成本的异地设仓。</p>
          </div>
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
    var topHeight1 = this.$refs.solution2.getBoundingClientRect().top;
    $("html, body").scrollTop(topHeight1)

    this.$store.commit('navIndex', 5);
  }
}
</script>
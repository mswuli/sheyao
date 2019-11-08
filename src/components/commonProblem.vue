<template>
<div>
  <c-menu></c-menu>
  <div class="problem-wrap">
    <div class="inner-title">
      <h1>常见问题</h1>
      <h3>Common problem</h3>
    </div>
    <div class="about-content">
      <div class="inner-wrap">
        <div class="problem-part">
          <b>1、	怎样注册成为用户？</b>
          <p>首先，在任意页面的上部点击“注册”，跳转到注册新用户的页面，按照提示填写好个人资料，阅读并同意服务条款后点击“同意服务条款并注册”，在注册资料填写正确的前提下，会提示企业进行自评，跳转至自评界面，自评完成后，平台运营端会完成审核，审核通过后会通过短信形式发送登陆账号及密码。</p>
        </div>
        <div class="problem-part">
          <b>2、	如何发布信息？</b>
          <p>会员企业进入会员端后，点击信息发布界面，选择对应的发布端口，根据提示填写相关信息资料，点击发布即可完成信息发布</p>
        </div>
        <div class="problem-part">
          <b>3、	如何管理信息？</b>
          <p>登陆会员端之后，点击相应发布信息，点击“管理”，即可修改、关闭和删除信息。</p>
        </div>
        <div class="problem-part">
          <b>4、	如何查找信息？</b>
          <p>会员企业进入会员端后，物流企业可进入货主端口，查找运输企业发布货量信息；生产企业和流通企业可进入运力网和仓储网查找符合条件的承运商信息和三方仓储资源。</p>
        </div>
        <div class="problem-part">
          <b>5、	平台信息审核规范？</b>
          <p>会员注册后，平台将对企业进行定期复评，完成入住会员的企业考察并予以公布。</p>
        </div>
        <div class="problem-part">
          <b>6、	信息删除？</b>
          <p>会员企业进入会员端之后，找到相应信息，点击“管理”，弹出删除按钮，即可完成信息删除。</p>
        </div>
        <div class="problem-part">
          <b>7、	信息修改？</b>
          <p>会员企业进入会员端之后，找到相应信息，点击“管理”，弹出修改按钮，进入修改界面即可完成信息修改。</p>
        </div>
        <div class="problem-part">
          <b>8、	用户账号删除？</b>
          <p>注销条件：</p>
          <p>a．账户处于正常状态，账号没有被盗，被封等风险。 </p>
          <p>b．半个月内未进行过修改密码、换绑手机、换绑邮箱操作。</p>
          <p>c．请确保账户内现金等均为0。</p>
          <p>d．没有正在使用中的平台产品。</p>
          <p>e．无正在进行中的交易（如置顶、刷新等）。</p>
          <p>f．发布的信息已删除。</p>
          <p>g. 用户未确认账户信息就申请注销，则造成的损失由用户承担。</p>
          <p>h. 客户致电的手机号与需要注销的账户认证手机一致。</p>
        </div>
        <div class="problem-part">
          <b>9、	密码丢失？</b>
          <p>在会员登录界面点击“忘记密码”，进入界面根据提示完成信息填写，平台管理员根据信息真实性完成审核，提示密码。</p>
        </div>
        <div class="problem-part">
          <b>10、	账号被盗用？</b>
          <p>在会员登录界面点击“忘记密码”，进入界面根据提示完成信息填写，平台管理员根据信息真实性完成审核，提示新的密码。</p>
        </div>
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
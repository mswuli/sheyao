<template>
  <div>
    <c-menu></c-menu>
    <div class="forget-password-wrap inner-wrap">
      <h2>找回密码</h2>
      <div class="forget-password-content">
        <Steps :current="current">
          <Step title="验证身份" icon="ios-contact-outline">
            <div class="step1 step-con">
              <p>请填写您需要找回的账号</p>
              <div class="password-input displayflex">
                <input type="text">
              </div>
              <div class="password-input displayflex">
                <div class="flex1">
                  <input type="text">
                </div>
                <a>获取验证码</a>
              </div>
              <button class="primary" @click="next">下一步</button>
            </div>
          </Step>
          <Step title="设置新密码" icon="ios-lock-outline">
            <div class="step2 step-con">
              <p>请填写新密码</p>
              <div class="password-input displayflex">
                <input type="text">
              </div>
              <p>请再次确认新密码</p>
              <div class="password-input displayflex">
                <input type="text">
              </div>
              <button class="primary" @click="next">下一步</button>
            </div>
          </Step>
          <Step title="完成" icon="ios-checkmark-circle-outline">
            <div class="step3 step-con">
              <h2>设置成功，请牢记您的新密码!</h2>
              <p>页面将在<span>5秒</span>内跳转登录界面</p>
            </div>
          </Step>
        </Steps>
      </div>
    </div>
  </div>
</template>
<script>
  import Cmenu from '@/components/common/menu.vue';
  export default {
    components: {'c-menu': Cmenu},
    data () {
      return {
        current: 0
      }
    },
    methods: {
      next () {
        if (this.current == 2) {
          this.current = 0;
        } else {
          this.current += 1;
        }
      }
    }
  }
</script>
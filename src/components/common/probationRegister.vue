<template>
<div>
  <c-menu></c-menu>
  <div class="inner-wrap">
    <div class="register-content" v-model="registerBox">
      <h2>试用账号注册</h2>

      <div class="login-input">
        <i class="iconfont icon-icon_home"></i>
        <input type="text" placeholder="请输入公司全称" v-model="CompanyName">
      </div>
      <div class="login-input">
        <i class="iconfont icon-user_name"></i>
        <input type="text" placeholder="请输入联系人" v-model="Contacts">
      </div>
      <div class="login-input">
        <i class="iconfont icon-tel_hollow"></i>
        <input placeholder="请输入手机号码" v-model="Mobile" type="txt" @keydown="numberVf" style="ime-mode:disabled" onpaste="return false">
      </div>
      <div class="login-tips">
        <p class="iconfont icon-wariness">此号码为本系统登录账号</p>
      </div>
      <div class="login-input">
        <i class="iconfont icon-password"></i>
        <input type="password" placeholder="请输入密码" min v-model="Password">
      </div>

      <div class="register-code">
        <input type="text" placeholder="验证码" v-model="VerifyCode">
        <span v-show="!show" class="count">{{count}} s</span>
        <a @click="OutVerifyCode" v-show="show">获取验证码</a>
      </div>
      <div slot="footer" class="footer">
        <Button type="success" size="large" long :loading="modal_loading" @click="Save">立即注册</Button>
        <!-- <p>您已经注册？请点击 <a @click="handleLogin">会员登录</a></p> -->
        <p>您已经注册？请点击 <a :href="loginUrl">会员登录</a></p>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import Cmenu from "./menu.vue";

export default {
  components: {
    "c-menu": Cmenu
  },
  computed: {
    RegisterUrl() {
      return `${this.apiUrls.cs4pl.baseURL}`;
    },
    loginUrl() {
      return `${this.apiUrls.loginUrl.baseURL}NavigateValue=${location.href}`;
    }
  },
  data() {
    const self = this;
    return {
      loginName: "",
      loginPwd: "",
      loginBox: false,
      modal_loading: false,
      single: false,
      registerBox: false,
      agreementBox: false,
      CompanyName: "",
      Contacts: "",
      Mobile: "",
      Password: "",
      ConfirmPassword: "",
      VerifyCode: "",
      ConVerifyCode: "",
      nationalData: self.$store.state.provinces,
      Venue: "",
      Province: "",
      City: "",
      District: "",
      show: true,
      count: "",
      timer: null,
      rememberPwd: false
    };
  },
  watch: {
    showLogin(val) {
      if (val) {
        // this.loginBox = val;
        this.registerBox = val;
        this.loginName = "";
        this.loginPwd = "";
        this.CompanyName = "";
        this.Contacts = "";
        this.Mobile = "";
        this.Password = "";
        this.ConfirmPassword = "";
        this.VerifyCode = "";
        this.ConVerifyCode = "";
        this.Venue = "";
        this.Province = "";
        this.City = "";
        this.District = "";
      }
    },
    registerBox(val) {
      if (!val) {
        this.$emit("resetVal");
      }
    },
    Mobile(v){
      if(!Number.isInteger(v)){
        this.Mobile = Number.parseInt(v) || '';
      }
    }
  },
  methods: {
    venue(val, txt) {
      this.Venue = txt.map(c => c.label).join("/");
      this.Province = val[0] == undefined ? "" : val[0];
      this.City = val[1] == undefined ? "" : val[1];
      this.District = val[2] == undefined ? "" : val[2];
    },
    // 打开协议框
    handleAgreement() {
      this.agreementBox = true;
    },
    // 同意协议并立即注册
    loginAgree() {
      this.agreementBox = false;
      this.single = true;
    },
    // 不同意
    loginDisagree() {
      this.agreementBox = false;
      this.registerBox = true;
      this.single = false;
    },
    // 获取验证码
    OutVerifyCode() {
      const self = this;
      self.show = false;
      if (this.timer) {
        this.$Message.warning("60m秒内不允许重复获取验证码！");
        return false;
      }
      var testTel = /^1[345789]\d{9}$/;
      if (!this.Mobile || !testTel.test(this.Mobile)) {
        this.$Message.warning("请输入您的正确手机号码！");
        return false;
      }
      var Num = "";
      for (var i = 0; i < 4; i++) {
        Num += Math.floor(Math.random() * 10);
      }
      this.ConVerifyCode = Num;

      this.$http
        .post(self.RegisterUrl + "/api/SendMessagesApi/SendSMS", {
          Mobile: this.Mobile,
          VerifyCode: Num
        })
        .then(function(rs) {
          if (rs.message == "发送成功") {
            self.getCode();
          }else{
            self.show = true;
          }
          self.$Message.warning(rs.message);
        });
    },
    ValidateControl() {
      if (!this.CompanyName) {
        this.$Message.warning("请输入公司全称！");
        return false;
      }
      if (!this.Contacts) {
        this.$Message.warning("请输入联系人！");
        return false;
      }
      if (!this.Mobile) {
        this.$Message.warning("请输入手机号码！");
        return false;
      }
      if (!this.Password) {
        this.$Message.warning("请输入密码！");
        return false;
      }
      if (!this.VerifyCode) {
        this.$Message.warning("请输入验证码！");
        return false;
      }
      if (this.Password.length < 6) {
        this.$Message.warning("密码长度至少6位！");
        return false;
      }
      if (this.Password.length >= 15) {
        this.$Message.warning("密码长度不能大于15位！");
        return false;
      }
      if (this.VerifyCode != this.ConVerifyCode || !this.ConVerifyCode) {
        this.$Message.warning("请填写正确的验证码！");
        return false;
      }
      return true;
    },
    // 立即注册
    Save() {
      const self = this;
      if (this.ValidateControl()) {
         setTimeout(() => {
            this.$http
          .post(self.RegisterUrl + "/api/CtaApiController/MemberRegist", {
            CompanyName: this.CompanyName,
            Contacts: this.Contacts,
            Mobile: this.Mobile,
            Password: this.Password,
            Venue: this.Venue,
            Province: this.Province,
            City: this.City,
            District: this.District,
            Classification:'2'
          })
          .then(function(rs) {
            self.$Message.warning(rs.message);
            self.loginName = self.Mobile;
            self.loginPwd = self.Password;
            self.loginBox = true;
            self.registerBox = false;
            if(rs.message != "注册提交失败,该用户已提交注册信息")
            {
              self.$router.push({ path: "/index" });
            }
          });
          }, 2000);
      }
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    numberVf(evt){
      var self = this;
      
      evt  = (evt) ? evt : window.event;
      if((evt.keyCode > 47 && evt.keyCode < 58) || evt.keyCode == 8 || evt.keyCode == 46 || (evt.keyCode >=96 && evt.keyCode <=105)||evt.keyCode == 8 || evt.keyCode == 46 || evt.keyCode == 37 || evt.keyCode == 39){
        if((self.Mobile+'').length == 11){
          if((evt.keyCode > 47 && evt.keyCode < 58)||(evt.keyCode >=96 && evt.keyCode <=105)){
            window.event.returnValue = false;
            }
            else{
              window.event.returnValue = true;
            }
        }
        else{
        window.event.returnValue = true;
        }
      }
      else{
        window.event.returnValue = false;
      }
    }
  },

};
</script>

<style scoped>
.inner-wrap {
  margin: 20px auto;
  background: #fff;
}
.register-content {
  width: 600px;
  padding: 0 0 30px;
  margin: 0 auto;
}

.register-content h2 {
  height: 74px;
  line-height: 74px;
  font-size: 24px;
  color: #4aa8e5;
  /* text-align: center; */
  border-bottom: 1px solid #ccc;
}

.login-input {
  height: 42px;
  line-height: 42px;
  border: 1px solid #bfbfbf;
  position: relative;
  padding-left: 50px;
  margin-top: 24px;
}

.login-input .iconfont {
  position: absolute;
  left: 0;
  width: 50px;
  font-size: 30px;
  color: #bfbfbf;
  text-align: center;
}

.login-input input {
  width: 100%;
  height: 100%;
  vertical-align: top;
  font-size: 18px;
}

.login-select {
  height: 18px;
  overflow: hidden;
  margin-top: 10px;
}

.login-select a {
  float: right;
  color: #f02d2d;
}

.register-code {
  height: 42px;
  line-height: 42px;
  font-size: 20px;
  margin-top: 24px;
}

.register-code a {
  text-align: center;
}

.register-code input {
  width: 138px;
  height: 100%;
  border: 1px solid #bfbfbf;
  text-align: center;
}

.register-code a {
  display: inline-block;
  width: 138px;
  color: #fff;
  background: #4aa8e5;
  margin-left: 20px;
}

.login-tips {
  margin-top: 10px;
  margin-bottom: -14px;
}

.login-tips p {
  color: #dc322e;
}

.login-tips p::before {
  margin-right: 10px;
}
.register-content .footer {
  padding: 30px 0 0;
}
.register-content .footer button {
  height: 50px;
  font-size: 18px;
  border-radius: 0;
  background: #4aa8e5;
}
.register-content .footer p {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: #bfbfbf;
  text-align: right;
  margin-top: 18px;
}
.agreement-wrap .ivu-modal-header p {
  height: 32px;
  line-height: 32px;
  font-size: 24px;
  color: #4aa8e5;
  text-align: center;
}

.agreement-content {
  max-height: 480px;
  padding: 20px;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  overflow-y: auto;
}

.agreement-content p {
  font-size: 14px;
  line-height: 28px;
  text-indent: 2rem;
}

.agreement-content p b{
  display: block;
  font-size: 16px;
  padding-top: 10px;
}

.agreement-content p span{
  padding-left: 2rem;
}
</style>

<template>
  <div class="footer-wrap">
    <div class="footer">
      <div class="footer-left fl">
        <img src="../../assets/images/footer-logo.png" alt="">
        <div class="footer-code">
          <div>
            <img src="../../assets/images/footer-code1.jpg" alt="">
            <p>扫描二维码关注平台</p>
          </div>
          <div>
            <img src="../../assets/images/footer-code2.jpg" alt="">
            <p>扫描二维码关注传世</p>
          </div>
        </div>
      </div>
      <div class="footer-right fl">
        <div class="footer-right-con">
          <div class="footer-right-link">
            <!-- <dl>
              <dt>快速通道</dt>
              <dd>
                <router-link to="/index">货源信息</router-link>
              </dd>
              <dd>
                <router-link to="/index">车源信息</router-link>
              </dd>
              <dd>
                <router-link to="/index">仓储资源信息</router-link>
              </dd>
              <dd>
                <router-link to="/index">商务合作</router-link>
              </dd>
            </dl> -->
            <dl>
              <dt>帮助</dt>
              <!-- <dd>
                <router-link to="/index">中心首页</router-link>
              </dd> -->
              <dd>
                <router-link to="/problem">常见问题</router-link>
              </dd>
              <!-- <dd>
                <router-link to="/index">我是货主</router-link>
              </dd>
              <dd>
                <router-link to="/index">我是承运商</router-link>
              </dd> -->
              <dd>
                <router-link to="/business">商务咨询</router-link>
              </dd>
            </dl>
          </div>
          <div class="footer-right-contact">
            <b>联系我们</b>
            <strong>400-056-1858</strong>
            <p>平台支持方：<a href="https://www.csbr.cn/" target="_blank">深圳传世般若科技有限公司</a></p>
            <p>地址：北京市西城区宣武门外大街庄胜崇光SOGO写字楼西翼1410室</p>
            <p>邮编：100052</p>
          </div>
        </div>
        <div class="copyright">
          <dl>
            <dt><img src="../../assets/images/footer-sign.jpg" alt=""></dt>
            <dd>
              <p><a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">COPYRIGHT © 2015-2017 粤ICP备16033858号-6</a></p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
.footer-wrap{
  background: #2F3D4A;
}
.footer{
  width: 1200px;
  margin: 0 auto;
  padding: 25px 0 50px;
  overflow: hidden;
}
.footer-left{
  width: 291px;
  text-align: center;
  margin-right: 95px;
}
.footer-code{
  padding-top: 40px;
}
.footer-code > div{
  float: left;
}
.footer-code > div:last-child{
  margin-left: 30px;
}
.footer-code img{
  width: 130px;
  height: 130px;
}
.footer-code p{
  font-size: 12px;
  color: #929292;
  padding: 16px 0;
}
.footer-right{
  width: 814px;
  padding-right: 90px;
}
.footer-right-con{
  min-height: 250px;
  padding: 38px 0 10px;
  overflow: hidden;
}
.footer-right-link{
  float: left;
}
.footer-right-link dl{
  float: left;
  margin-right: 40px;
}
.footer-right-link dl dt{
  height: 24px;
  line-height: 24px;
  color: #EFEFEF;
}
.footer-right-link dl dd{
  height: 32px;
  line-height: 32px;
}
.footer-right-link dl dd a{
  font-size: 12px;
  color: #6B88A2;
}
.footer-right-link dl dd a::before{
  content: '· ';
}
.footer-right-contact{
  float: right;
}
.footer-right-contact b{
  display: block;
  height: 24px;
  line-height: 24px;
  color: #EFEFEF;
}
.footer-right-contact strong{
  display: block;
  font-size: 24px;
  color: #fff;
  padding: 15px 0 23px;
}
.footer-right-contact p{
  font-size: 12px;
  color: #6B88A2;
  line-height: 22px;
}
.footer-right-contact p a{
  color: #6B88A2;
}
.copyright{
  width: 600px;
  border-top: 1px solid #5f6c7c;
  padding-top: 15px;
  clear: both;
}
.copyright dl dt{
  float: left;
  margin-right: 10px;
}
.copyright dl dd{
  float: left;
  color: #6B88A2;
}
.copyright a{
  color: #6B88A2;
}
</style>

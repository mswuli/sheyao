<template>
<div class="right-menu">
  <ul>
    <li>
      <i class="iconfont icon-weixin"></i>
      <span><img src="../../assets/images/footer-code1.jpg" alt=""></span>
    </li>
    <li>
      <i class="iconfont icon-qq"></i>
      <span>
        <a href="tencent://message/? uin=2933108227&amp;Site=http://www.qq.com&amp;Menu=yes">2933108227</a>
        <!-- <a href="tencent://message/? uin=2933108227&amp;Site=http://www.qq.com&amp;Menu=yes">2933108227</a> -->
      </span>
    </li>
    <li>
      <i class="iconfont icon-tel"></i>
      <span>400-056-1858</span>
    </li>
  </ul>
  <BackTop :right="0" :bottom="80"></BackTop>
</div>
</template>

<script>
export default {}
</script>
<style scoped>
.right-menu{
  position: fixed;
  right: 0;
  bottom: 120px;
}
.right-menu li{
  display: block;
  width: 48px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  transition: all .2s ease-in-out;
  cursor: pointer;
  position: relative;
}
.right-menu li i{
  display: inline-block;
  width: 48px;
  font-size: 30px;
  color: #fff;
  background-color: #666;
  position: relative;
  z-index: 3;
}
.right-menu li span{
  position: absolute;
  top: 0;
  left: 48px;
  width: 150px;
  font-size: 20px;
  color: #fff;
  background-color: #474747;
  transition: all .5s ease-in-out;
}
.right-menu li span a{
  color: #fff;
  display: block;
  line-height: 32px;
}
.right-menu li span a:first-child{
  padding-top: 9px;
}
.right-menu li span a:last-child{
  padding-bottom: 9px;
}
.right-menu li i.icon-weixin + span{
  height: 150px;
  padding: 10px;
}
.right-menu li:hover i{
  background-color: #474747;
}
.right-menu li:hover span{
  left: -150px;
}
</style>

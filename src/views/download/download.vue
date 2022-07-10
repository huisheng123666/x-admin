<template>
  <div class="download">
    <div class="center">
      <video src="https://admin.xmw.monster/x/xm.MP4" muted autoplay loop></video>
      <div class="desc">
        <h4>X M电影APP</h4>
        <p>无聊开发的观影APP，悄悄的用</p>
        <a class="git" href="https://github.com/huisheng123666/x_m">github</a>
        <a class="android" href="/api/movie/download" download="movie.apk">安卓下载，ios你懂得</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="stylus">
.download
  width 100vw
  height 100vh
  background url(./bg.jpeg) center center no-repeat
  background-size cover
  display flex
  align-items center
  @media screen and (max-width: 800px)
    display block
  .center
    display flex
    align-items center
    width 800px
    margin 0 auto
    @media screen and (max-width: 800px)
      display block
      width 100vw
    &>video
      width 250px
    .desc
      margin-left 50px
      &>h4
        margin-bottom 20px
        font-size 30px
        color #fff
      &>p
        margin-bottom 20px
        font-size 20px
        color #fff
      .git
        display block
        margin-bottom 20px
        font-size 18px
        color #00B7FF
      .android
        font-size 16px
        color #00B7FF
</style>

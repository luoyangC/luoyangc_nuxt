/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:01:31
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 12:32:18
 */
<template>
  <v-footer color="rgba(0,0,0,0)" height="80" style="font-size:12px">
    <v-layout column justify-center align-center>
      <v-layout>&copy; 2019</v-layout>
      <v-layout justify-center align-center>
        <v-img height="18" width="18" src="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/icons/beiantubiao.ico" />
        <a href="http://www.miitbeian.gov.cn" rel="external nofollow">&nbsp;渝 ICP 备 18014351 号&nbsp;</a>
      </v-layout>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:41:47
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 22:57:25
 */
<template>
  <div>
    <v-layout justify-center class="nav-footer">
      <v-btn fab flat title="背景主题" @click="active = 1">
        <v-icon>format_paint</v-icon>
      </v-btn>
      <v-btn fab flat title="字体大小" @click="active = 2">
        <v-icon>text_fields</v-icon>
      </v-btn>
      <v-btn fab flat title="字体样式" @click="active = 3">
        <v-icon>font_download</v-icon>
      </v-btn>
    </v-layout>
    <!-- 选择背景主题 -->
    <v-layout justify-center>
      <v-expand-transition>
        <v-card v-show="active === 1" flat height="110" width="320" color="transparent" class="transition-fast-in-fast-out">
          <v-layout fill-height justify-center align-center>
            <v-btn-toggle v-model="themas" mandatory class="them-toggle" @change="handleThema">
              <v-btn fab flat title="自动">
                <v-icon>brightness_auto</v-icon>
              </v-btn>
              <v-btn fab flat title="纯白">
                <v-icon>brightness_low</v-icon>
              </v-btn>
              <v-btn fab flat title="夜间">
                <v-icon>brightness_medium</v-icon>
              </v-btn>
              <v-btn fab flat title="碎花">
                <v-icon>brightness_high</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-layout>
        </v-card>
      </v-expand-transition>
    </v-layout>
    <!-- 修改字体大小 -->
    <v-layout justify-center>
      <v-expand-transition>
        <v-card v-show="active === 2" flat height="110" width="240" color="transparent" class="transition-fast-in-fast-out font-slider">
          <v-slider v-model="fontSize" thumb-label="always" thumb-size="24" min="10" max="30" @change="handleFontSize" />
        </v-card>
      </v-expand-transition>
    </v-layout>
    <!-- 设置文本字体 -->
    <v-layout justify-center>
      <v-expand-transition>
        <v-card v-show="active === 3" flat height="110" width="320" color="transparent" class="transition-fast-in-fast-out">
          <v-layout fill-height justify-center align-center>
            <v-btn-toggle v-model="fontFamily" mandatory class="font-toggle" @change="handleFontFamily">
              <v-btn flat>
                <v-layout column justify-center align-center>
                  <div class="font-default font-show-en">Ag</div>
                  <div class="font-default font-show-ch">默认</div>
                </v-layout>
              </v-btn>
              <v-btn flat>
                <v-layout column justify-center align-center>
                  <div class="font-Serif font-show-en">Ag</div>
                  <div class="font-Serif font-show-ch">衬线</div>
                </v-layout>
              </v-btn>
              <v-btn flat>
                <v-layout column justify-center align-center>
                  <div class="font-mono font-show-en">Ag</div>
                  <div class="font-mono font-show-ch">等宽</div>
                </v-layout>
              </v-btn>
            </v-btn-toggle>
          </v-layout>
        </v-card>
      </v-expand-transition>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'NavbarOption',
  data: () => ({
    active: 0,
    themas: 0,
    fontFamily: 0,
    fontSize: 16
  }),
  methods: {
    handleThema(val) {
      this.$store.dispatch('app/setThem', val)
    },
    handleFontSize(val) {
      console.log(val)
      this.$store.dispatch('app/setFontSize', val)
    },
    handleFontFamily(val) {
      this.$store.dispatch('app/setFontFamily', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.font-show-en
  font-size: 25px
.font-show-ch
  font-size: 12px
  line-height: 1.35
  margin-top: 4px

.font-slider
  display flex
  align-items flex-end

.v-card--reveal
  position absolute
  top 0
  align-items center
  justify-content center
  width 100%
  height 100%
  background-color #000 !important
  border-radius 100px
  color #fff
  opacity .8

.them-toggle
  box-shadow none !important
  .v-btn
    width 50px !important
    height 50px !important
    margin 0 5px
  .v-btn--floating
    border-radius: 50% !important

.font-toggle
  box-shadow none !important
  .v-btn
    height 60px
    margin 0 10px
</style>

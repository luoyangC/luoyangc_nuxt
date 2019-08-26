/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:41:47
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 12:34:34
 */
<template>
  <div>
    <v-layout class="nav-footer" justify-center>
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

    <v-layout justify-center>
      <v-expand-transition>
        <v-card
          v-show="active === 1"
          flat
          class="transition-fast-in-fast-out"
          height="110"
          width="320"
          color="rgba(0,0,0,0)"
        >
          <v-layout fill-height justify-center align-center>
            <v-btn-toggle v-model="themas" mandatory class="them-toggle">
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

    <v-layout justify-center>
      <v-expand-transition>
        <v-card
          v-show="active === 2"
          flat
          class="transition-fast-in-fast-out font-slider"
          height="110"
          width="240"
          color="rgba(0,0,0,0)"
        >
          <v-slider v-model="fontSize" thumb-label="always" thumb-size="24" min="10" max="30" />
        </v-card>
      </v-expand-transition>
    </v-layout>

    <v-layout justify-center>
      <v-expand-transition>
        <v-card
          v-show="active === 3"
          flat
          class="transition-fast-in-fast-out"
          height="110"
          width="320"
          color="rgba(0,0,0,0)"
        >
          <v-layout fill-height justify-center align-center>
            <v-btn-toggle v-model="fontFamily" mandatory class="font-toggle">
              <v-btn flat>
                <v-layout column justify-center align-center>
                  <div style="font-size: 25px" class="font-default">Ag</div>
                  <div
                    style="font-size: 12px; line-height: 1.35; margin-top: 4px;"
                    class="font-default"
                  >默认</div>
                </v-layout>
              </v-btn>
              <v-btn flat>
                <v-layout column justify-center align-center>
                  <div style="font-size: 25px" class="font-Serif">Ag</div>
                  <div
                    style="font-size: 12px; line-height: 1.35; margin-top: 4px;"
                    class="font-Serif"
                  >衬线</div>
                </v-layout>
              </v-btn>
              <v-btn flat>
                <v-layout column justify-center align-center>
                  <div style="font-size: 25px" class="font-mono">Ag</div>
                  <div
                    style="font-size: 12px; line-height: 1.35; margin-top: 4px;"
                    class="font-mono"
                  >等宽</div>
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
  })
}
</script>

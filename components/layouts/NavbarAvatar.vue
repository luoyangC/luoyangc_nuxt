/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:27:02
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 12:34:22
 */
<template>
  <v-layout justify-center mt-5 mb-2>
    <v-hover v-if="currentUser.id">
      <v-avatar slot-scope="{ hover }" size="80" color="grey lighten-4">
        <img :src="currentUser.image" alt="avatar">
        <v-expand-transition>
          <v-card v-if="hover" class="transition-fast-in-fast-out v-card--reveal" ripple nuxt to="/user">
            <v-icon large dark>touch_app</v-icon>
          </v-card>
        </v-expand-transition>
      </v-avatar>
    </v-hover>

    <v-hover v-else>
      <v-avatar slot-scope="{ hover }" size="80" color="grey lighten-4">
        <img src="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/icons/xigua.png" alt="avatar">
        <v-expand-transition>
          <v-card v-if="hover" class="transition-fast-in-fast-out v-card--reveal" ripple nuxt to="/login">
            <v-icon large dark>fingerprint</v-icon>
          </v-card>
        </v-expand-transition>
      </v-avatar>
    </v-hover>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavbarAvatar',
  computed: {
    ...mapGetters('user', [
      'currentUser'
    ])
  }
}
</script>

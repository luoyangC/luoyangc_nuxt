<template>
  <v-layout fill-height>
    <v-layout align-center justify-center>

      <v-flex xs12 sm10 md8 lg6 xl4 mb-5 mt-2 ml-2 mr-2>

        <v-card flat dark>
          <v-img :src="user.image"  aspect-ratio="2">
            <v-layout column fill-height justify-center align-center dark-back>
              <v-layout justify-center align-center>
                <v-avatar size="100" color="grey lighten-4">
                  <img class="rotate" :src="user.image" alt="avatar">
                </v-avatar>
              </v-layout>
              <v-layout justify-center align-center>
                <v-btn round outline depressed large @click="logout">注销</v-btn>
                <v-btn round outline depressed large @click="modify">修改</v-btn>
              </v-layout>
            </v-layout>
          </v-img>
        </v-card>

        <v-card flat>
          <v-card-title>基本用户信息</v-card-title>
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-text-field v-model="user.username" label="用户名称">
                  <v-icon slot="prepend" class="iconfont" size="24">icon-yonghu</v-icon>
                </v-text-field>

                <v-menu :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field slot="activator" v-model="user.birthday" label="用户生日" readonly>
                    <v-icon slot="prepend" class="iconfont" size="24">icon-calendar</v-icon>
                  </v-text-field>
                  <v-date-picker v-model="user.birthday" @input="menu = false"></v-date-picker>
                </v-menu>

                <v-select v-model="user.gender" :items="genders" label="用户性别">
                  <v-icon slot="prepend" class="iconfont" size="24">icon-xingbie</v-icon>
                </v-select>

                <v-text-field v-model="user.homepage" label="个人网站">
                  <v-icon slot="prepend" class="iconfont" size="24">icon-wangzhan</v-icon>
                </v-text-field>
                <v-text-field v-model="user.profile" label="个人简介">
                  <v-icon slot="prepend" class="iconfont" size="24">icon-imagetext</v-icon>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

      </v-flex>

    </v-layout>
    <v-snackbar v-model="snackbar" top color="success" auto-height>{{success}}</v-snackbar>
  </v-layout>
</template>

<script>
import cookie from '@/static/js/cookie'

export default {

  async asyncData({ $axios }) {
    let {data} = await $axios.get(`/user/`)

    return {
      user: data,
      genders: ['male', 'female', 'unknown'],
      menu: false,
      snackbar: false,
      success: ''
    }
  },

  computed: {
    currentUser() {
      return this.$store.getters.cartCurrentUser
    }
  },

  methods: {
    async logout() {
      cookie.delCookie('token')
      this.$store.commit('setCurrentUser', { id: null, image: '/icons/icon-a.png' })
      this.$router.go(-1)
    },
    async modify() {
      let data = {
        username: this.user.username,
        birthday: this.user.birthday,
        homepage: this.user.homepage,
        profile: this.user.profile,
        gender: this.user.gender,
      }
      let user = await this.$axios.patch(`/user/${this.user.id}/`, data)
      this.success = '恭喜您修改成功！！！'
      this.snackbar = true
    }
  }
}
</script>

<template>
  <v-layout fill-height>
    <v-layout align-center justify-center>

      <v-flex xs12 sm10 md8 lg6 xl4 mb-5 mt-2 ml-2 mr-2>

        <v-card flat dark>
          <v-img :src="user.image"  aspect-ratio="2">
            <v-layout column fill-height justify-center align-center dark-back>
              <v-avatar size="100" color="grey lighten-4">
                <img class="rotate" :src="user.image" alt="avatar">
              </v-avatar>
              <v-btn round outline depressed large class="mt-5" @click="logout">注销</v-btn>
            </v-layout>
          </v-img>
        </v-card>

        <v-card flat>
          <v-card-title>基本用户信息</v-card-title>
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-text-field v-model="user.username" label="用户名称"></v-text-field>
                <v-text-field v-model="user.email" label="注册邮箱" readonly></v-text-field>
                <v-text-field v-model="user.birthday" label="用户生日"></v-text-field>
                <v-text-field v-model="user.gender" label="用户性别"></v-text-field>
                <v-text-field v-model="user.email" label="个人网站"></v-text-field>
                <v-textarea v-model="user.profile" label="个人简介"></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

      </v-flex>

    </v-layout>
  </v-layout>
</template>

<script>
import cookie from '@/static/js/cookie'

export default {

  async asyncData({ $axios }) {
    let {data} = await $axios.get(`/user/`)
    console.log(data)
    return {
      user: data
    }
  },

  computed: {
    currentUser() {
      return this.$store.getters.cartCurrentUser
    }
  },

  methods: {
    logout() {
      cookie.delCookie('token')
      this.$store.commit('setCurrentUser', { id: null, image: '/images/user/icon-a.png' })
      this.$router.go(-1)
    }
  }
}
</script>

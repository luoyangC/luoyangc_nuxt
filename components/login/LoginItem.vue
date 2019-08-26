<template>
  <v-card flat tile>
    <v-card-text>
      <v-form>
        <v-text-field v-model="username" :rules="[rules.required]" :error-messages="errors.username" prepend-icon="person" label="用户名或者邮箱" type="text" validate-on-blur @input="initialError" />
        <v-text-field v-model="password" :rules="[rules.required, rules.min, rules.max]" :error-messages="errors.password" prepend-icon="lock" label="账户密码" type="password" validate-on-blur @input="initialError" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-layout column align-center pl-5 pr-5>
        <v-btn round large color="primary" @click.stop="login">登录</v-btn>
        <v-layout mt-5>——— 社交帐号登录 ———</v-layout>
        <v-layout mb-5 mt-2>
          <v-btn flat icon color="green lighten-2">
            <v-icon class="iconfont" size="36">icon-weixin</v-icon>
          </v-btn>
          <v-btn flat icon color="blue lighten-2">
            <v-icon class="iconfont" size="36">icon-social-qq</v-icon>
          </v-btn>
          <v-btn flat icon color="red lighten-2">
            <v-icon class="iconfont" size="36">icon-weibo</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import cookie from '@/static/js/cookie'

export default {
  data: () => ({
    username: '',
    password: '',
    rules: {
      required: value => !!value || '该内容不能为空',
      min: value => value.length >= 8 || '最少需要输入8个字符',
      max: value => value.length <= 20 || '最后可以输入20个字符'
    },
    errors: { username: [], password: [] }
  }),
  methods: {
    // 初始化错误信息
    initialError() {
      this.errors = { username: [], password: [] }
    },
    // 用户登录
    async login() {
      try {
        const { data, status } = await this.$axios.post(`/login/`, { username: this.username, password: this.password })
        if (status === 200) {
          cookie.setCookie('token', data.token, 30)
          const user = await this.$axios.get(`/user/`)
          this.$store.commit('setCurrentUser', user.data)
          this.$router.go(-1)
        }
      } catch (error) {
        this.errors.username = error.data.non_field_errors[0] + '请检查账号是否存在'
        this.errors.password = error.data.non_field_errors[0] + '请检查密码是否正确'
      }
    }
  }
}
</script>

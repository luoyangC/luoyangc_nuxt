<template>
  <v-layout fill-height>
    <v-layout align-center justify-center>

      <v-flex xs12 sm10 md8 lg6 xl4 mb-5>
        <v-tabs v-model="active" dark height="300" slider-color="yellow">

          <v-img :src="currentImage" aspect-ratio="2">
            <v-layout fill-height justify-center align-center dark-back>
              <v-tab active-class="active-disabled" :ripple="false">
                <v-btn round outline depressed large>切换登录</v-btn>
              </v-tab>
              <v-tab active-class="active-disabled" :ripple="false">
                <v-btn round outline depressed large>切换注册</v-btn>
              </v-tab>
            </v-layout>
          </v-img>

          <v-tab-item>
            <v-card flat tile>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" :rules="[rules.required]" :error-messages="errors.username" @input="initialError" prepend-icon="person" label="用户名或者邮箱" type="text" validate-on-blur></v-text-field>
                  <v-text-field v-model="password" :rules="[rules.required, rules.min, rules.max]" :error-messages="errors.password" @input="initialError" prepend-icon="lock" label="账户密码" type="password" validate-on-blur></v-text-field>
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
          </v-tab-item>

          <v-tab-item>
            <v-card flat tile>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" :rules="[rules.required, rules.email]" :error-messages="errors.email" @input="initialError" prepend-icon="email" label="注册邮箱" type="text" validate-on-blur>
                    <v-btn depressed small slot="append" @click="getEmailCode">获取验证码</v-btn>
                  </v-text-field>
                  <v-text-field v-model="code" :rules="[rules.required, rules.code]" :error-messages="errors.code" @input="initialError" prepend-icon="visibility" label="邮箱验证码" type="text" validate-on-blur></v-text-field>
                  <v-text-field v-model="password1" :rules="[rules.required, rules.min, rules.max]" prepend-icon="lock" label="账户密码" type="password" validate-on-blur></v-text-field>
                  <v-text-field v-model="password2" :rules="[rules.required, rules.min, rules.max]" @input="verification" :error-messages="errors.password2" prepend-icon="lock" label="请再次输入密码" type="password" validate-on-blur></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-layout column align-center pl-5 pr-5 mb-5>
                  <v-btn round large color="primary" @click.stop="register">注册</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          
        </v-tabs>

        <v-snackbar v-model="snackbar" top color="success" auto-height>{{success}}</v-snackbar>

      </v-flex>

    </v-layout>
  </v-layout>
</template>

<script>
import cookie from '@/static/js/cookie'

export default {
  async asyncData({app}) {
    let imageId = app.store.getters.cartRandomImage[5] || 100
    return {
      snackbar: false,
      success: '',
      active: 0,
      code: '',
      email: '',
      username: '',
      password: '',
      password1: '',
      password2: '',
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/${imageId}.png`,
      rules: {
        required: value => !!value || '该内容不能为空',
        min: value => value.length >= 8 || '最少需要输入8个字符',
        max: value => value.length <= 20 || '最后可以输入20个字符',
        code: value => value.length == 6 || '输入验证码不合法',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '输入邮箱不合法'
        },
      },
      errors: {username: [], password: [], email: [], code: [], password2: []},
    } 
  },

  methods: {
    // 验证密码是否一致
    verification(value) {
      if (value != this.password1) this.errors.password2 = '密码不一致'
      else this.errors.password2 = []
    },
    // 初始化错误信息
    initialError() {
      this.errors = {username: [], password: [], email: [], code: [], password2: []}
    },
    // 获取邮箱验证码
    async getEmailCode() {
      try {
        let { status } = await this.$axios.post(`/code/`, {email: this.email, send_type: 'register'})
        if (status == 201) {
          this.success = '邮件发送成功，请注意查收！'
          this.snackbar = true
        }
      } catch (error) {
        this.errors.email = error.data.non_field_errors[0]
      }
    },
    // 用户注册
    async register() {
      try {
        let { status } = await this.$axios.post(`/user/`, {email: this.email, code: this.code, password: this.password1})
        if (status == 201) {
          this.active = 0
          this.success = '恭喜您注册成功！！！'
          this.snackbar = true
        }
      } catch (error) {
        this.errors.code = error.data.code[0]
      }
    },
    // 用户登录
    async login() {
      try {
        let {data, status} = await this.$axios.post(`/login/`, {username:this.username, password:this.password})
        if (status == 200) {
          cookie.setCookie('token', data.token, 30)
          let user = await this.$axios.get(`/user/`)
          this.$store.commit('setCurrentUser', user.data)
          this.$router.go(-1)
        }
      } catch (error) {
        this.errors.username = error.data.non_field_errors[0] + '请检查账号是否存在'
        this.errors.password = error.data.non_field_errors[0] + '请检查密码是否正确'
      }
    },
  },
};
</script>

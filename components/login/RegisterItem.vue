<template>
  <v-card flat tile>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" :rules="[rules.required, rules.email]" :error-messages="errors.email" prepend-icon="email" label="注册邮箱" type="text" validate-on-blur @input="initialError">
          <v-btn slot="append" depressed small @click="getEmailCode">获取验证码</v-btn>
        </v-text-field>
        <v-text-field v-model="code" :rules="[rules.required, rules.code]" :error-messages="errors.code" prepend-icon="visibility" label="邮箱验证码" type="text" validate-on-blur @input="initialError" />
        <v-text-field v-model="password1" :rules="[rules.required, rules.min, rules.max]" prepend-icon="lock" label="账户密码" type="password" validate-on-blur />
        <v-text-field v-model="password2" :rules="[rules.required, rules.min, rules.max]" :error-messages="errors.password2" prepend-icon="lock" label="请再次输入密码" type="password" validate-on-blur @input="verification" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-layout column align-center pl-5 pr-5 mb-5>
        <v-btn round large color="primary" @click.stop="register">注册</v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    code: '',
    email: '',
    password1: '',
    password2: '',
    rules: {
      required: value => !!value || '该内容不能为空',
      min: value => value.length >= 8 || '最少需要输入8个字符',
      max: value => value.length <= 20 || '最后可以输入20个字符',
      code: value => value.length === 6 || '输入验证码不合法',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || '输入邮箱不合法'
      }
    },
    errors: { email: [], code: [], password2: [] }
  }),

  methods: {
    // 验证密码是否一致
    verification(value) {
      if (value !== this.password1) this.errors.password2 = '密码不一致'
      else this.errors.password2 = []
    },
    // 初始化错误信息
    initialError() {
      this.errors = { username: [], password: [], email: [], code: [], password2: [] }
    },
    // 获取邮箱验证码
    async getEmailCode() {
      try {
        const { status } = await this.$axios.post(`/code/`, { email: this.email, send_type: 'register' })
        if (status === 201) {
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
        const { status } = await this.$axios.post(`/user/`, { email: this.email, code: this.code, password: this.password1 })
        if (status === 201) {
          this.active = 0
          this.success = '恭喜您注册成功！！！'
          this.snackbar = true
        }
      } catch (error) {
        this.errors.code = error.data.code[0]
      }
    }
  }
}
</script>

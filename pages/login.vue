<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
          <v-tab ripple>登录</v-tab>
          <v-tab ripple>注册</v-tab>
          <v-tab-item>
            <v-card flat tile>
              <v-card-title>
                登录
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions> 
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.stop="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat tile>
              <v-card-title>
                注册
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="email" name="email" label="Email" type="text">
                    <v-btn depressed small slot="append">获取验证码</v-btn>
                  </v-text-field>
                  <v-text-field prepend-icon="visibility" name="code" label="Code" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions> 
                <v-spacer></v-spacer>
                <v-btn color="primary">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      username: '',
      password: '',
    } 
  },
  methods: {
    async login() {
      let { data } = await loginEmail({username:this.username, password:this.password})
      cookie.setCookie('token', data.token, 7)
    },
  },
};
</script>

<style>
</style>

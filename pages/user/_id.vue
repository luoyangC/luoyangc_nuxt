<template>
  <v-layout fill-height>
    <v-layout align-center justify-center>

      <v-flex xs12 sm10 md8 lg6 xl4 mb-5 mt-2 ml-2 mr-2>

        <v-card flat dark>
          <v-img :src="user.image" aspect-ratio="2">
            <v-layout column fill-height justify-center align-center dark-back>
              <v-avatar size="100" color="grey lighten-4">
                <img class="rotate" :src="user.image" alt="avatar">
              </v-avatar>
            </v-layout>
          </v-img>
        </v-card>

        <v-card flat>
          <v-card-title>基本用户信息</v-card-title>
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-text-field :value="user.username || '必填'" label="用户名称" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-yonghu</v-icon>
                </v-text-field>
                <v-text-field :value="user.birthday || '未设置'" label="用户生日" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-calendar</v-icon>
                </v-text-field>
                <v-text-field :value="user.gender || '未设置'" label="用户性别" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-xingbie</v-icon>
                </v-text-field>
                <v-text-field :value="user.email || '未设置'" label="个人网站" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-wangzhan</v-icon>
                </v-text-field>
                <v-textarea :value="user.profile || '该用户很懒，什么也没留下'" label="个人简介" readonly>
                  <v-icon slot="prepend" class="iconfont" size="24">icon-imagetext</v-icon>
                </v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

      </v-flex>

    </v-layout>
  </v-layout>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  async asyncData({ params, $axios }) {
    const { data } = await $axios.get(`/user/${params.id}/`)

    if (data.gender === 'male') data.gender = '男'
    else if (data.gender === 'female') data.gender = '女'
    else data.gender = '未知'

    return {
      user: data
    }
  }
}
</script>

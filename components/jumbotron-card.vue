<template>
  <v-layout column justify-center mb-5>
    <v-img :height="height" :src="image">
      <v-layout column align-center justify-center dark-back fill-height pl-3 pr-3>
        <h1 class="title-text font-weight-bold mb-3">{{title}}</h1>
        <h3 class="white--text">{{lines}}</h3>
      </v-layout>
    </v-img>
  </v-layout>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
    lines: String,
    height: Number,
  }
}
</script>

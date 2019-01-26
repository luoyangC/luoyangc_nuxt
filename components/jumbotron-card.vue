<template>
  <v-layout column justify-center mb-5>
    <v-parallax class="hidden-xs-only" :height="height" dark :src="image">
      <v-layout column align-center justify-center dark-back>
        <h1 class="title-text font-weight-bold display-2 mb-3">{{title}}</h1>
        <h3 class="sentence-text">{{lines}}</h3>
      </v-layout>
    </v-parallax>

    <v-img class="hidden-sm-and-up" :height="height" :src="image">
      <v-layout column align-center justify-center dark-back fill-height>
        <h1 class="title-text font-weight-bold display-2 mb-3">{{title}}</h1>
        <h3 class="sentence-text">{{lines}}</h3>
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

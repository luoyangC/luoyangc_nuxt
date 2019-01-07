<template>
  <v-app>

    <v-navigation-drawer :clipped="clipped" v-model="drawer" width="350" fixed app>
      <v-list>
        <v-list-tile>
          <v-list-tile-title>
            Application
          </v-list-tile-title>
          <v-list-tile-action>
            <v-btn icon ripple @click="drawer = !drawer">
              <v-icon dark>more_vert</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-for="(item, i) in items" :to="item.to" :key="i" router exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="rgba(0,0,0,0)" :clipped-left="clipped" flat fixed>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
    </v-toolbar>

    <v-content>
      <nuxt/>
    </v-content>

    <v-footer>
      <v-spacer></v-spacer>
      <span>&copy; 2017</span>
      <v-spacer></v-spacer>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        { icon: "apps", title: "Welcome", to: "/" },
        { icon: "bubble_chart", title: "Inspire", to: "/inspire" }
      ],
      title: "Amor的博客"
    };
  }
};
</script>

<style lang="stylus">
</style>


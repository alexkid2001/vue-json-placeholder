<template>
  <div>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { NavBar },
  methods: {
    ...mapActions([
      'getAllPosts',
      'getUsers'
    ])
  },
  computed: {
    ...mapGetters([
      'postsList'
    ])
  },
  mounted () {
    this.getUsers()
  }

}
</script>

<style lang="scss">
</style>

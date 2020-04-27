<template>
  <b-card
    :title="post.title"
    class="mb-2"
  >
    <router-link class="post__auth" :to="`/users/${post.id}`">{{ userName }}</router-link>
    <b-card-text>
      {{ post.body }}
    </b-card-text>
    <b-button href="#" to="/posts/${post.id}" variant="primary">Go somewhere</b-button>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Post',
  props: [
    'post'
  ],
  computed: {
    ...mapGetters([
      'users'
    ]),
    userName () {
      return this.users.find(user => user.id === this.post.userId).username
    }
  }
}
</script>

<style scoped>
.post__auth {
  cursor: pointer;
}

</style>

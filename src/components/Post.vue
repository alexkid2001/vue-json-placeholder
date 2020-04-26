<template>
  <b-card
    :title="post.title"
    class="mb-2"
  >
    <b-card-text>
      {{ post.body }}
    </b-card-text>
    <b-button href="#" to="/posts/${post.id}" variant="primary">Go somewhere</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Post',
  props: [
    'post'
  ]
}
</script>

<style scoped>

</style>

<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col align="center">
        <b-button-group>
          <b-button variant="success">Infinity Scroll</b-button>
          <b-button variant="success">Button More</b-button>
          <b-button variant="success">Pagination</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
<!--        Current Page: {{ currentPage }}-->
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h2>Posts</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" v-for="post in displayedPosts" :key="post.id">
        <Post
          :post="post"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col align="center">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          @input="paginate(currentPage)"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Post from '../components/Post'
import { mapActions, mapGetters } from 'vuex'

// const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

export default {
  name: 'posts',
  components: {
    Post
  },
  data () {
    return {
      // posts: []
      perPage: 3,
      currentPage: 1,
      displayedPosts: []
    }
  },
  methods: {
    ...mapActions([
      'getPostById'
    ]),
    paginate (currentPage) {
      const start = currentPage * this.perPage
      const end = start + this.perPage
      this.displayedPosts = this.postsList.slice(start, end)
    }
  },
  computed: {
    ...mapGetters([
      'postsList'
    ]),
    rows () {
      return this.postsList.length - 1
    }
    // pagePosts () {
    //   const start = this.currentPage * this.perPage
    //   return this.postsList.slice(start, start + this.pagePosts)
    // }
  },
  mounted () {
    this.displayedPosts = this.postsList.slice(0, this.perPage)
    // this.getPostById(1)
    // axios(baseUrl)
    //   .then(resp => {
    //     this.posts = resp.data
    //     console.log(resp.data)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
  }
}
</script>

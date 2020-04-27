<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h2>Posts</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col align="center" class="mb-3">
        <b-button-group>
          <b-button variant="success" data-mode="infinity" @click="changeScrollMode($event)">Infinity Scroll</b-button>
          <b-button variant="success" data-mode="more" @click="changeScrollMode($event)">Button More</b-button>
          <b-button variant="success" data-mode="pagination" @click="changeScrollMode($event)">Pagination</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col  align="center" class="mb-3">
        Scroll Mode: {{ scrollMode }}
      </b-col>
    </b-row>
    <b-row>
      <b-col  align="center" class="mb-3">
        Current Page: {{ currentPage }}
      </b-col>
    </b-row>
    <b-row>
      <b-col>
<!--        Current Page: {{ currentPage }}-->
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" v-for="post in displayedPosts" :key="post.id">
        <Post
          :post="post"
        />
      </b-col>
    </b-row>
    <b-row  v-if="scrollMode === 'pagination'">
      <b-col align="center">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          @input="paginate(currentPage)"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-row v-else-if="scrollMode === 'more'">
      <b-col align="center">
        <b-button
          variant="outline-primary"
          :disabled="currentPage === maxPage"
          @click="showMore()"
        >Show more...</b-button>
      </b-col>
    </b-row>
    <b-row>
      <div ref="infiniteScrollTrigger" class="scroll-trigger"></div>
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
      displayedPosts: [],
      scrollMode: 'pagination',
      observer: null
    }
  },
  methods: {
    ...mapActions([
      'getPostById',
      'getAllPosts'
    ]),
    paginate (currentPage) {
      const start = currentPage * this.perPage
      const end = start + this.perPage
      this.displayedPosts = this.postsList.slice(start, end)
    },
    showMore () {
      if (this.currentPage < this.maxPage) {
        this.currentPage++
        const start = this.currentPage * this.perPage
        const end = start + this.perPage
        this.displayedPosts.push(...this.postsList.slice(start, end))
      }
    },
    changeScrollMode (event) {
      const mode = event.target.attributes['data-mode'].value
      this.scrollMode = mode
      this.currentPage = 1
      this.displayedPosts = this.postsList.slice(0, this.perPage)
      if (mode === 'infinity') {
        this.observer.observe(this.$refs.infiniteScrollTrigger)
      } else {
        this.observer.disconnect()
      }
    }
  },
  computed: {
    ...mapGetters([
      'postsList'
    ]),
    rows () {
      return this.postsList.length - 1
    },
    maxPage () {
      return Math.floor(this.rows / this.perPage)
    }
  },
  mounted () {
    this.getAllPosts()
      .then(() => {
        this.displayedPosts = this.postsList.slice(0, this.perPage)
      })

    // this.onScroll()
    // this.getPostById(1)
    // axios(baseUrl)
    //   .then(resp => {
    //     this.posts = resp.data
    //     console.log(resp.data)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // if (entry.intersectionRatio > 0) {
        //   this.showMore()
        // }
        if (entry.isIntersecting) {
          this.showMore()
          console.log('target')
        }
      })
    })

    this.observer.observe(this.$refs.infiniteScrollTrigger)
  }
}
</script>

<style>
  .scroll-trigger {
    margin-top: 100px;
  }
</style>

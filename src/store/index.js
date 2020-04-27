import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    post: '',
    posts: [],
    users: {}

  },
  mutations: {
    savePostToState (state, payload) {
      this.state.post = payload
    },
    savePostsToState (state, payload) {
      this.state.posts = payload
    },
    saveUsersToState (state, payload) {
      this.state.users = payload
    }
  },
  actions: {
    getPostById ({ commit }, id) {
      axios({
        method: 'get',
        url: 'posts/1'
      })
        .then(resp => {
          // commit('savePostToState', resp.data)
          console.log(resp.data)
          return resp.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    async getAllPosts ({ commit }) {
      await axios({
        method: 'get',
        url: 'posts'
      })
        .then(resp => {
          commit('savePostsToState', resp.data)
          console.log('state.posts', this.state.posts)
        })
        .catch(err => console.error(err))
    },
    async getUsers ({ commit }) {
      await axios({
        method: 'get',
        url: 'users'
      })
        .then(resp => {
          commit('saveUsersToState', resp.data)
          console.log('users :', resp.data)
        })
        .catch(err => console.error(err))
    }

  },
  modules: {
  },
  getters: {
    postsList (state) {
      return state.posts
    },
    users (state) {
      return state.users
    }
  }
})

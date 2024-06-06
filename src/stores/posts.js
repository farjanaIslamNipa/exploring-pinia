import { defineStore } from "pinia";

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [],
        loading: false,
        error: null
    }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('https://health-aid-hub-backend.vercel.app/api/v1/supplies');
        this.posts = await response.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
})


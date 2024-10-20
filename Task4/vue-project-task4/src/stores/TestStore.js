import { defineStore } from 'pinia'
import { fetchData } from '@/services/axios/conf.js'

export const useTestStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fill() {
      try {
        this.users = await fetchData() //Async
      } catch (error) {
        console.error('Error', error)
      }
    }
  }
})

<!-- src/views/Home.vue -->
<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Welcome</h2>
    <div class="bg-gray-50 p-4 rounded-md">
      <p class="text-gray-700">User: <span class="font-semibold">{{ user?.email }}</span></p>
    </div>
    <button @click="logout"
      class="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200">
      Logout
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: null,
      api: axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
  },
  async created() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
      return
    }
    try {
      const response = await this.api.get('/me')
      this.user = response.data
    } catch (error) {
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.$toast.error('Session expired, please login again')
    }
  },
  methods: {
    async logout() {
      try {
        const response = await this.api.delete('/logout')
        this.$toast.success(response.data.message)
      } catch (error) {
        this.$toast.error('Logout failed')
      } finally {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
</script>
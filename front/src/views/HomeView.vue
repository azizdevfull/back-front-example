<!-- src/views/Home.vue -->
<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Welcome</h2>
    <div class="bg-gray-50 p-4 rounded-md">
      <p class="text-gray-700">User: <span class="font-semibold">{{ user?.email }}</span></p>
    </div>
    <button @click="logout" class="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
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
    }
  },
  methods: {
    async logout() {
      try {
        await this.api.delete('/logout')
      } finally {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
</script>
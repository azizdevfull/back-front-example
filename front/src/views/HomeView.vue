<!-- src/views/Home.vue -->
<template>
  <div>
    <h2>Welcome</h2>
    <p>User: {{ user?.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: null,
      api: axios.create({
        baseURL: 'http://localhost:8000/api', // Replace with your backend URL
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
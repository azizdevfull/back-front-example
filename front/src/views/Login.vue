<!-- src/views/Login.vue -->
<template>
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form @submit.prevent="login" class="space-y-4">
            <div>
                <input v-model="email" type="email" placeholder="Email" required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <input v-model="password" type="password" placeholder="Password" required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <button type="submit"
                class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Login
            </button>
        </form>
        <p class="mt-4 text-center">
            <router-link to="/register" class="text-blue-500 hover:underline">
                Need an account? Register
            </router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: '',
            password: '',
            api: axios.create({
                baseURL: 'http://localhost:8000/api',
                headers: {
                    'Accept': 'application/json'
                }
            })
        }
    },
    methods: {
        async login() {
            try {
                const response = await this.api.post('/login', {
                    email: this.email,
                    password: this.password
                })
                localStorage.setItem('token', response.data.token)
                this.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                this.$router.push('/')
            } catch (error) {
                alert('Login failed: ' + error.response.data.message)
            }
        }
    }
}
</script>
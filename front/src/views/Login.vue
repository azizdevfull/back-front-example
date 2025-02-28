<!-- src/views/Login.vue -->
<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required>
            <input v-model="password" type="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <router-link to="/register">Need an account? Register</router-link>
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
                baseURL: 'http://localhost:8000/api', // Replace with your backend URL
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
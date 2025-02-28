<!-- src/views/Register.vue -->
<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <input v-model="name" type="name" placeholder="Name" required>
            <input v-model="email" type="email" placeholder="Email" required>
            <input v-model="password" type="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
        <router-link to="/login">Already have an account? Login</router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            name: '',
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
        async register() {
            try {
                const response = await this.api.post('/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                localStorage.setItem('token', response.data.token)
                this.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                this.$router.push('/')
            } catch (error) {
                alert('Registration failed')
            }
        }
    }
}
</script>
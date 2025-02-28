<!-- src/views/Register.vue -->
<template>
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        <form @submit.prevent="register" class="space-y-4">
            <div>
                <input v-model="name" type="text" placeholder="Name" required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span v-if="errors.name" class="text-red-500 text-sm mt-1 block">{{ errors.name[0] }}</span>
            </div>
            <div>
                <input v-model="email" type="email" placeholder="Email" required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span v-if="errors.email" class="text-red-500 text-sm mt-1 block">{{ errors.email[0] }}</span>
            </div>
            <div>
                <input v-model="password" type="password" placeholder="Password" required
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span v-if="errors.password" class="text-red-500 text-sm mt-1 block">{{ errors.password[0] }}</span>
            </div>
            <button type="submit"
                class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Register
            </button>
        </form>
        <p class="mt-4 text-center">
            <router-link to="/login" class="text-blue-500 hover:underline">
                Already have an account? Login
            </router-link>
        </p>
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
            errors: {},
            api: axios.create({
                baseURL: 'http://localhost:8000/api',
                headers: {
                    'Accept': 'application/json'
                }
            })
        }
    },
    methods: {
        async register() {
            this.errors = {}
            try {
                const response = await this.api.post('/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                localStorage.setItem('token', response.data.token)
                this.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

                this.$toast.success(response.data.message)
                this.$router.push('/')
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.errors = error.response.data.errors
                    this.$toast.error('Please fix the form errors')
                } else {
                    this.$toast.error(error.response?.data?.message || 'Registration failed')
                }
            }
        }
    }
}
</script>
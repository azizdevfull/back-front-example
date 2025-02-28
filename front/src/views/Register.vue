<!-- src/views/Register.vue -->
<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div>
                <input v-model="name" type="text" placeholder="Name" required>
                <span class="error" v-if="errors.name">{{ errors.name[0] }}</span>
            </div>
            <div>
                <input v-model="email" type="email" placeholder="Email" required>
                <span class="error" v-if="errors.email">{{ errors.email[0] }}</span>
            </div>
            <div>
                <input v-model="password" type="password" placeholder="Password" required>
                <span class="error" v-if="errors.password">{{ errors.password[0] }}</span>
            </div>
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
            this.errors = {} // Clear previous errors
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
                if (error.response && error.response.status === 422) {
                    // Handle validation errors
                    this.errors = error.response.data.errors
                } else {
                    // Handle other errors
                    alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'))
                }
            }
        }
    }
}
</script>

<style scoped>
.error {
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
    display: block;
}

div {
    margin-bottom: 15px;
}

input {
    display: block;
    width: 100%;
    max-width: 300px;
    padding: 8px;
}

button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h1>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-medium mb-1">Email:</label>
            <input 
              id="email"
              type="email" 
              v-model="email" 
              required 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 text-sm font-medium mb-1">Password:</label>
            <input 
              id="password"
              type="password" 
              v-model="password" 
              required 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <p v-if="errorMessage" class="mt-4 text-red-500 text-sm text-center">{{ errorMessage }}</p>
          <p v-if="successMessage" class="mt-4 text-green-500 text-sm text-center">{{ successMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import authService from '@/services/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
        successMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          const user = await authService.login(this.email, this.password);
          if (user) {
            this.$store.dispatch('login', user);
            this.successMessage = 'Login successful!';
            const role = this.$store.getters.userRole;
            if (role === 'Admin') {
              this.$router.push('/dashboard/admin');
            } else if (role === 'Project Manager') {
              this.$router.push('/dashboard/project-manager');
            } else if (role === 'Engineer') {
              this.$router.push('/dashboard/engineer');
            } else {
              this.errorMessage = 'Unknown role';
            }
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        } catch (error) {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
    },
  };
  </script>
  
  
  

  
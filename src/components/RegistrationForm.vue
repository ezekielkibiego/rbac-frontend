<template>
  <div class="p-4 border rounded-lg shadow-md">
    <button @click="toggleForm" class="bg-blue-500 text-white p-2 rounded mb-4">
      {{ showRegisterForm ? 'Hide Register Form' : 'Register New User' }}
    </button>

    <div v-if="showRegisterForm" class="p-4 border rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Register New User</h3>
      <form @submit.prevent="register">
        <!-- Input fields with v-model for binding data -->
        <div class="mb-4">
          <label class="block text-gray-700">First Name:</label>
          <input v-model="firstName" type="text" class="mt-1 p-2 border rounded w-full" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Last Name:</label>
          <input v-model="lastName" type="text" class="mt-1 p-2 border rounded w-full" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email:</label>
          <input v-model="email" type="email" class="mt-1 p-2 border rounded w-full" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password:</label>
          <input v-model="password" type="password" class="mt-1 p-2 border rounded w-full" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Phone:</label>
          <input v-model="phone" type="text" class="mt-1 p-2 border rounded w-full" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Address:</label>
          <input v-model="address" type="text" class="mt-1 p-2 border rounded w-full" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">KRA PIN:</label>
          <input v-model="kraPin" type="text" class="mt-1 p-2 border rounded w-full" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Role:</label>
          <select v-model="roleIds" multiple class="mt-1 p-2 border rounded w-full" required>
            <option value="1">Admin</option>
            <option value="2">Project Manager</option>
            <option value="3">Engineer</option>
          </select>
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      kraPin: '',
      roleIds: [],
      showRegisterForm: false,
    };
  },
  methods: {
    async register() {
      console.log('Register method called'); // Debugging

      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        address: this.address,
        kraPin: this.kraPin,
        roleIds: this.roleIds,
      };

      const token = localStorage.getItem('authToken');
      console.log('Retrieved Token:', token); // Debugging

      try {
        const response = await api.post('users', userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Registration successful:', response.data); // Debugging
        this.resetForm();
        this.$emit('register', userData);
      } catch (error) {
        console.error('Registration error:', error.response?.data?.message || error.message); // Debugging
      }
    },

    toggleForm() {
      this.showRegisterForm = !this.showRegisterForm;
    },

    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.phone = '';
      this.address = '';
      this.kraPin = '';
      this.roleIds = [];
    },
  },
};
</script>

<style scoped>
</style>

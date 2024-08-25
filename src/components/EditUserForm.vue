<template>
    <div v-if="user" class="p-4 border border-gray-300 rounded-lg bg-white">
      <h3 class="text-xl font-semibold mb-4">Edit User</h3>
      <form @submit.prevent="updateUser">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <input v-model="form.firstName" id="firstName" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input v-model="form.lastName" id="lastName" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" id="email" type="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input v-model="form.phone" id="phone" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="cancelEdit" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
          <button type="submit" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
        </div>
      </form>
      <div v-if="errorMessage" class="mt-4 text-red-600">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        form: { ...this.user }, 
        errorMessage: '',
      };
    },
    methods: {
      async updateUser() {
        const token = localStorage.getItem('authToken');
        console.log(token)
        try {
          await api.patch(`users/${this.user.id}`, this.form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.$emit('updateUser');
          this.errorMessage = ''; 
        } catch (error) {
          this.errorMessage = error.response?.data?.message || 'Error updating user';
          console.error('Error updating user:', this.errorMessage);
        }
      },
      cancelEdit() {
        this.$emit('cancelEdit');
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  
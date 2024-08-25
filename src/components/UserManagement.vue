<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">User Management</h3>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100 border-b">
            <th class="py-2 px-4 text-left">ID</th>
            <th class="py-2 px-4 text-left">First Name</th>
            <th class="py-2 px-4 text-left">Last Name</th>
            <th class="py-2 px-4 text-left">Email</th>
            <th class="py-2 px-4 text-left">Phone</th>
            <th class="py-2 px-4 text-left">Roles</th>
            <th class="py-2 px-4 text-left">Actions</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b">
            <td class="py-2 px-4">{{ user.id }}</td>
            <td class="py-2 px-4">{{ user.firstName }}</td>
            <td class="py-2 px-4">{{ user.lastName }}</td>
            <td class="py-2 px-4">{{ user.email }}</td>
            <td class="py-2 px-4">{{ user.phone }}</td>
            <td class="py-2 px-4">
              {{ user.roles.map(role => role.name).join(', ') }}
            </td>
            <td class="py-2 px-4">
              <button @click="editUser(user)" class="text-blue-600 hover:text-blue-800">Edit</button>
              <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-800 ml-4">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: {
        type: Array,
        required: true,
      },
    },
    methods: {
      editUser(user) {
        this.$emit('editUser', user.id, user);
      },
      deleteUser(userId) {
        this.$emit('deleteUser', userId);
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
  }
  th, td {
    text-align: left;
  }
  </style>
  
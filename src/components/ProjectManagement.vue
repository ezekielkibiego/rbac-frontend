<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Project Management</h3>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100 border-b">
            <th class="py-2 px-4 text-left">ID</th>
            <th class="py-2 px-4 text-left">Name</th>
            <th class="py-2 px-4 text-left">Description</th>
            <th class="py-2 px-4 text-left">Manager</th>
            <th class="py-2 px-4 text-left">Engineer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id" class="border-b">
            <td class="py-2 px-4">{{ project.id }}</td>
            <td class="py-2 px-4">{{ project.name }}</td>
            <td class="py-2 px-4">{{ project.description }}</td>
            <td class="py-2 px-4">
              {{ project.manager?.firstName || 'N/A' }} {{ project.manager?.lastName || '' }}
              <br/>
              ({{ project.manager?.email || 'N/A' }})
            </td>
            <td class="py-2 px-4">
              {{ project.engineer?.firstName || 'N/A' }} {{ project.engineer?.lastName || '' }}
              <br/>
              ({{ project.engineer?.email || 'N/A' }})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      projects: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS or custom styles */
  table {
    width: 100%;
  }
  th, td {
    text-align: left;
  }
  </style>
  
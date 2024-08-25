<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Project Manager Dashboard</h2>
      
      <!-- Section for viewing and editing assigned projects -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">Assigned Projects</h3>
        <ProjectManagement :projects="projects" @editProject="editProject" />
      </div>
  
      <!-- Section for viewing all users -->
      <div>
        <h3 class="text-xl font-semibold mb-4">All Users</h3>
        <UserManagement :users="users" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ProjectManagement from './ProjectManagement.vue';
  import UserManagement from './UserManagement.vue';
  import api from '@/services/api';
  
  export default {
    components: {
      ProjectManagement,
      UserManagement,
    },
    setup() {
      const projects = ref([]);
      const users = ref([]);
  
      const fetchProjects = async () => {
        const token = localStorage.getItem('authToken');
        try {
          const response = await api.get('projects', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const projectsData = response.data.data;
          
          // Fetch managers and engineers
          const managerIds = [...new Set(projectsData.map(p => p.managerId))];
          const engineerIds = [...new Set(projectsData.map(p => p.engineerId))];
  
          const managersResponse = await api.get(`users?ids=${managerIds.join(',')}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const engineersResponse = await api.get(`users?ids=${engineerIds.join(',')}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          const managers = managersResponse.data.data;
          const engineers = engineersResponse.data.data;
  
          // Combine projects with manager and engineer details
          projects.value = projectsData.map(project => ({
            ...project,
            manager: managers.find(m => m.id === project.managerId),
            engineer: engineers.find(e => e.id === project.engineerId),
          }));
        } catch (error) {
          console.error('Error fetching projects:', error.response?.data?.message || error.message);
        }
      };
  
      const fetchUsers = async () => {
        const token = localStorage.getItem('authToken');
        try {
          const response = await api.get('users', {
            headers: { Authorization: `Bearer ${token}` },
          });
          users.value = response.data.data;
        } catch (error) {
          console.error('Error fetching users:', error.response?.data?.message || error.message);
        }
      };
  
      const editProject = async (projectId, projectData) => {
        const token = localStorage.getItem('authToken');
        try {
          await api.put(`projects/${projectId}`, projectData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Optionally refetch projects after editing
          fetchProjects();
        } catch (error) {
          console.error('Error editing project:', error.response?.data?.message || error.message);
        }
      };
  
      onMounted(() => {
        fetchProjects();
        fetchUsers();
      });
  
      return {
        projects,
        users,
        editProject,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  </style>
  
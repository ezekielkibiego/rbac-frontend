<template>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <div class="mb-6">
        <UserManagement
          :users="users"
          @editUser="startEditingUser"
          @deleteUser="deleteUser"
        />
      </div>
  
      <div class="mb-6">
        <ProjectManagement
          :projects="projects"
          @editProject="editProject"
          @deleteProject="deleteProject"
        />
      </div>
  
      <div class="mb-6" v-if="editingUser">
        <EditUserForm
          :user="editingUser"
          @updateUser="fetchUsers"
          @cancelEdit="cancelEdit"
        />
      </div>
  
      <div>
        <RegistrationForm @register="handleRegistration" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import UserManagement from '@/components/UserManagement.vue';
  import ProjectManagement from '@/components/ProjectManagement.vue';
  import RegistrationForm from '@/components/RegistrationForm.vue';
  import EditUserForm from '@/components/EditUserForm.vue';
  import api from '@/services/api';
  
  export default {
    components: {
      UserManagement,
      ProjectManagement,
      RegistrationForm,
      EditUserForm,
    },
    setup() {
      const users = ref([]);
      const projects = ref([]);
      const editingUser = ref(null); // User being edited
  
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
  
      const fetchProjects = async () => {
        const token = localStorage.getItem('authToken');
        try {
          const response = await api.get('projects', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const projectsData = response.data.data;
          
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
  
          projects.value = projectsData.map(project => ({
            ...project,
            manager: managers.find(m => m.id === project.managerId),
            engineer: engineers.find(e => e.id === project.engineerId),
          }));
        } catch (error) {
          console.error('Error fetching projects:', error.response?.data?.message || error.message);
        }
      };
  
      const handleRegistration = async (userData) => {
        const token = localStorage.getItem('authToken');
        try {
          await api.post('users', userData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchUsers();
          await fetchProjects();
        } catch (error) {
          console.error('Registration error:', error.response?.data?.message || error.message);
        }
      };
  
      const startEditingUser = (userId, user) => {
        editingUser.value = user;
      };
  
      const cancelEdit = () => {
        editingUser.value = null; 
      };
  
      const editUser = async (userId, userData) => {
        const token = localStorage.getItem('authToken');
        try {
          await api.patch(`users/${userId}`, userData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchUsers();
          cancelEdit(); 
        } catch (error) {
          console.error('Error editing user:', error.response?.data?.message || error.message);
        }
      };
  
      const deleteUser = async (userId) => {
        const token = localStorage.getItem('authToken');
        try {
          await api.delete(`users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchUsers();
        } catch (error) {
          console.error('Error deleting user:', error.response?.data?.message || error.message);
        }
      };
  
      const editProject = async (projectId, projectData) => {
        const token = localStorage.getItem('authToken');
        try {
          await api.put(`projects/${projectId}`, projectData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchProjects();
        } catch (error) {
          console.error('Error editing project:', error.response?.data?.message || error.message);
        }
      };
  
      const deleteProject = async (projectId) => {
        const token = localStorage.getItem('authToken');
        try {
          await api.delete(`projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchProjects();
        } catch (error) {
          console.error('Error deleting project:', error.response?.data?.message || error.message);
        }
      };
  
      onMounted(async () => {
        await fetchUsers();
        await fetchProjects();
      });
  
      return {
        users,
        projects,
        editingUser,
        handleRegistration,
        startEditingUser,
        cancelEdit,
        editUser,
        deleteUser,
        editProject,
        deleteProject,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  
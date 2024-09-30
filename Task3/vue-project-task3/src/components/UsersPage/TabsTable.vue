<template>
  <div class="table-responsive-wrapper">
    <table class="table table-bordered table-hover table-striped">
      <TableHeader :columns="['Name', 'UserName', 'Email', 'User Type', 'Created Date', 'Actions']" />
      <tbody>
        <tr
          v-for="user in usersStore.users"
          :key="user.id"
        >
          <td>{{ user.name }} </td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.type }}</td>
          <td>{{ user.createdDate }}</td>
          <td class="text-center d-flex justify-content-between">
            <UserDialog
              icon="mdi-pencil"
              :userObj="user"
              @saveUser="(event) => {
        console.log('Received event:', event);
        console.log('User ID being passed:', user.id);

        console.log('Before editing users:', usersStore.users);
        
        usersStore.editUser(event, user.id);
        
        console.log('After editing users:', usersStore.users);
        console.log('Done');
      }"
            >
              <template #EditUser> </template>
            </UserDialog>
            <UserDialog
              icon="mdi-account-details-outline"
              :userObj="user"
            >
              <template #ViewUser> </template>
            </UserDialog>
            <v-btn
              icon
              @click="openDeleteDialog(user.id)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <v-dialog
    v-model="errorDialog"
    max-width="400"
  >
    <v-card class="text-center">
      <v-card-title class="headline">
        <v-icon class="text-red ">mdi-delete</v-icon>
        <h1 class="text-center">Delete User</h1>
      </v-card-title>
      <v-card-text>Are you sure you want to delete this user?</v-card-text>
      <v-card-actions class="d-flex justify-content-center">
        <v-btn
          color="white"
          class="bg-red"
          text
          @click="confirmDelete"
        >Yes, I'm sure</v-btn>
        <v-btn
          color="black"
          class="bg-white border"
          text
          @click="errorDialog = false"
        >Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/stores/UserPage/UsersStore.js'
import TableHeader from '../TablePage/body/TableHeader.vue'
import UserDialog from './Dialogs/UserDialog.vue'

const usersStore = useUsersStore()
usersStore.loadUsers()

const errorDialog = ref(false)
const userIdToDelete = ref(null)

function openDeleteDialog(userId) {
  userIdToDelete.value = userId
  errorDialog.value = true
}

function confirmDelete() {
  usersStore.deleteUser(userIdToDelete.value)
  errorDialog.value = false
}
</script>

<style scoped>
@media (max-width: 600px) {
  .table-responsive-wrapper {
  overflow: auto;
  width: 51%;
}

.table {
  width: 100%;
  min-width: 900px; 
  table-layout: fixed;
}

}

.table-responsive-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-responsive-wrapper::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.table-responsive-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>

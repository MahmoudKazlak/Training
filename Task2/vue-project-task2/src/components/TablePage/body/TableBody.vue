<template>
  <tbody>
    <tr
      v-for="user in usersStore.users"
      :key="user.id"
    >
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.address.city }} - {{ user.address.street }} - {{ user.address.zipcode }}</td>
      <td>{{ user.phone }}</td>
      <td>{{ user.company.name }}</td>
    </tr>
  </tbody>
</template>
<script setup>
import { useUserStore } from '@/stores/UserStore'
let usersStore = useUserStore()
usersStore.fill()
</script>
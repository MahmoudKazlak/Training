<template>
  <tbody>
    <tr
      v-for="user in testStore.users"
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
import { useTestStore } from '@/stores/TestStore'
let testStore = useTestStore()
testStore.fill()
</script>
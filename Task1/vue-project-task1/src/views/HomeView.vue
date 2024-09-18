<script setup>
import TableHeader from '@/components/Table/TableHeader.vue'
import TableBody from '@/components/Table/TableBody.vue'
</script>

<template>
  <h2 class="text-center mb-3 text-danger">User List</h2>
  <table class="table table-bordered">
    <TableHeader :columns="['User ID', 'User Name', 'Email', 'Address', 'Phone', 'Company Name']" />
    <TableBody />
  </table>
</template>

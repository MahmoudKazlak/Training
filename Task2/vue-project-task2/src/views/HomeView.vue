<script setup>
import TableHeader from '@/components/TablePage/body/TableHeader.vue'
import TableBody from '@/components/TablePage/body/TableBody.vue'
import PageHeader from '@/components/TablePage/header/PageHeader.vue'
</script>

<template>
  <PageHeader />
  <h2 class="text-center mb-3 text-danger">User List</h2>
  <table class="table table-bordered">
    <TableHeader :columns="['User ID', 'User Name', 'Email', 'Address', 'Phone', 'Company Name']" />
    <TableBody />
  </table>
</template>

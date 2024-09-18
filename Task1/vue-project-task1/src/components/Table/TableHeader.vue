<template>
  <thead class="thead-dark">
    <tr>
      <th
        v-for="column in columns"
        :key="column"
      >{{ column }} </th>
    </tr>
  </thead>
</template>
<script setup>
defineProps({
  columns: Array
})
</script>
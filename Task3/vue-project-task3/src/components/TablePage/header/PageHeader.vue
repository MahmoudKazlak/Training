<template>
  <NavBar class="navbar">
    <IcoDropdown class="navbar-item">
      <template #default>
        <IoNotifications />
      </template>
    </IcoDropdown>
    <IcoDropdown
      class="navbar-item"
      :items="['English', 'Arabic']"
    >
      <template #drop>
        <IcLanguage />
      </template>
    </IcoDropdown>
    <NavProfile
      class="navbar-item"
      name="Mahmoud Kazlak"
      description="PITS"
    />
  </NavBar>
  <TableFilter />
</template>

<script setup>
import { IoNotifications } from '@kalimahapps/vue-icons'
import { IcLanguage } from '@kalimahapps/vue-icons'
import IcoDropdown from './nav/IcoDropdown.vue'
import NavProfile from './nav/NavProfile.vue'
import NavBar from './nav/NavBar.vue'
import TableFilter from '../body/TableFilter.vue'
</script>



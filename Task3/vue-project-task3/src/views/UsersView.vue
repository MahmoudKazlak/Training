<script setup>
import { IoNotifications } from '@kalimahapps/vue-icons'
import { IcLanguage } from '@kalimahapps/vue-icons'
import IcoDropdown from '@/components/TablePage/header/nav/IcoDropdown.vue'
import NavProfile from '@/components/TablePage/header/nav/NavProfile.vue'
import NavBar from '@/components/TablePage/header/nav/NavBar.vue'
import TabsView from '@/components/UsersPage/TabsView.vue'
</script>

<template>
  <v-container>
    <NavBar
      class="navbar"
      title="Users and Accounts"
    >
      <IcoDropdown>
        <template #default>
          <IoNotifications />
        </template>
      </IcoDropdown>
      <IcoDropdown :items="['English', 'Arabic']">
        <template #drop>
          <IcLanguage />
        </template>
      </IcoDropdown>
      <NavProfile
        name="Mahmoud Kazlak"
        description="PITS"
      />
    </NavBar>
    
    <TabsView> </TabsView>
  </v-container>
</template>

<style scoped>
</style>

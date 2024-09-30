<script setup>
import { ref } from 'vue';
import TabsFilter from './TabsFilter.vue';
const tab = ref('one');
</script>

<template>
  <v-card flat class="tops">
    <v-tabs v-model="tab" bg-color="transparent" class="tabs">
      <v-tab value="one">Users</v-tab>
      <v-tab value="two">Accounts</v-tab>
    </v-tabs>

    <v-card-text class="custom-card-text">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <TabsFilter />
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          two
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.tops {
  position: absolute;
  top: 5rem;
  left: 11rem;
  right: 0;
  bottom: 0;
  max-width: 100%;
  overflow: auto;
}

.custom-card-text {
  width: 100%;
  max-width: 100%;
}

.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 800px) {
  .tabs {
    flex-direction: column;
  }
  .tops {
    left: 1rem;
    right: 1rem;
    margin-top: 20px;
    top: 6rem; 
  }
}

@media (max-width: 600px) {
  .tabs {
    flex-direction: column;
  }
  
  .tops {
    left: 0;
    right: 0;
    margin: 10px; 
  }
}
</style>

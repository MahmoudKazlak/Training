<script setup>
import { ref, computed } from 'vue'
import { i18n } from '@/main'
import TabsFilter from './TabsFilter.vue'

// Initialize tab based on locale
const tab = ref(i18n.global.locale === 'ar' ? 'one' : 'one')

const tabsAlign = computed(() => (i18n.global.locale === 'ar' ? 'end' : 'start'))

const isRtl = computed(() => i18n.global.locale === 'ar')
</script>

<template>
  <v-card
    flat
    class="tops"
  >
    <v-tabs
      v-model="tab"
      bg-color="transparent"
      :align-tabs="tabsAlign"
      class=""
      v-if="!isRtl"
    >
      <v-tab value="one">{{ $t('Users') }}</v-tab>
      <v-tab value="two">{{ $t('Accounts') }}</v-tab>
    </v-tabs>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      :align-tabs="tabsAlign"
      v-else
    >
      <v-tab value="two">{{ $t('Accounts') }}</v-tab>
      <v-tab value="one">{{ $t('Users') }}</v-tab>
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
  right: 11rem;
  bottom: 0;
  max-width: 100%;
  overflow: auto;
}

.custom-card-text {
  width: 100%;
  max-width: 100%;
}
.v-tabs {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 800px) {
  .tops {
    left: 1rem;
    right: 1rem;
    margin-top: 20px;
    top: 6rem;
  }
}

@media (max-width: 600px) {
  .tops {
    left: 0;
    right: 0;
    margin: 10px;
  }
}
</style>

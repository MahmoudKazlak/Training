<template>
  <v-card
    flat
    height="170px"
    class="mt-10 card-height"
  >
    <v-row class="my-4 align-center">
      <!-- Search -->
      <v-col
        cols="12"
        md="9"
        class="mb-3 d-flex gap-3 align-items-center"
      >
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>

        <!-- All -->
        <v-select
          v-model="all"
          :items="items"
          variant="outlined"
          hide-details
          single-line
          item-color="#0601ae"
        ></v-select>

        <!-- Tags -->
        <v-select
          v-model="selectedTags"
          :items="tags"
          label="Tags"
          chips
          multiple
          variant="outlined"
          hide-details
          single-line
        ></v-select>

        <!-- Export -->
        <IcoDropdown
          :items="['Export as PDF', 'Export as Excel']"
          :icons="[pdf, excel]"
        >
          <template #dropBtn>
            <v-btn
              variant="outlined"
              class="text-capitalize gray h-max"
            >Export</v-btn>
          </template>
        </IcoDropdown>

        <!-- Refresh -->
        <v-btn
          variant="outlined"
          class="gray"
          aria-label="Refresh"
        >
          <v-icon icon="mdi-refresh"></v-icon>
        </v-btn>
      </v-col>

      <!-- Settings -->
      <v-col
        cols="12"
        md="3"
        class="mb-3 d-flex align-items-center justify-end"
        block
      >
        <v-menu
          v-model="settingsMenu"
          activator="parent"
        >
          <template #activator="{ props }">
            <v-btn
              variant="outlined"
              class="gray fullw"
              aria-label="Settings"
              v-bind="props"
            >
              <v-icon icon="mdi-cog"></v-icon>
            </v-btn>
          </template>

          <v-list
            style="max-height: 300px; overflow-y: auto; padding: 10px"
            @wheel.stop
          >
            <v-list-item>
              <v-list-item-content>
                <h4
                  class="text-center"
                  style="border-bottom: 2px solid #ccc; padding-bottom: 8px"
                >
                  Choose Columns
                </h4>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(item, index) in settingsOptions"
              :key="index"
              class="text-dark fw-bold"
              style="margin-bottom: 0px;"
            >
              <v-list-item-content>
                <v-checkbox
                  v-model="selectedSettings"
                  :label="item"
                  :value="item"
                  @click.stop
                  color="green"
                ></v-checkbox>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import IcoDropdown from '../header/nav/IcoDropdown.vue'

const pdf = '/icons/PDF.ico'
const excel = '/icons/Excel.ico'
const items = ['All', 'licenses expired', 'licenses not expired', 'with tracking']
const tags = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5']

const all = ref('All')
const search = ref('')
const selectedTags = ref([])
const settingsMenu = ref(false)
const selectedSettings = ref([])
const settingsOptions = [
  'Name',
  'Last Update',
  'Status',
  'Odometer',
  'License Exp',
  'Test',
  'Test2'
]
</script>

<style scoped>
.gray {
  border-color: rgb(189, 184, 184);
}
.h-max {
  height: auto;
}
.fw-bold {
  font-weight: bold;
}

@media (max-width: 600px) {
  .mb-3 {
    margin-bottom: 16px;
  }
  .card-height {
    height: 220px !important;
  }
  .fullw {
    width: 100%;
  }
}
</style>

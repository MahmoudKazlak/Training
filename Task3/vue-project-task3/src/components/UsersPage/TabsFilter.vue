<template>
  <v-card
    flat
    height="170px"
    class="card-height"
  >
    <v-row class="my-4 align-center">
      <!-- Search -->
      <v-col
        cols="12"
        md="5"
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

      <!-- Add user & Settings -->
      <v-col
        cols="12"
        md="7"
        class="mb-3 d-flex gap-3 align-items-center justify-end control"
      >
        <!-- Add user -->

        <UserDialog> <template #AddUser>Add User</template> </UserDialog>
        <!-- Settings -->
        <v-menu v-model="settingsMenu">
          <template #activator="{ props }">
            <v-btn
              variant="outlined"
              class="gray "
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
              style="margin-bottom: 0px"
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
  <table class="table table-bordered">
    <TabsTable />
  </table>

</template>

<script setup>
import { ref } from 'vue'
import IcoDropdown from '../TablePage/header/nav/IcoDropdown.vue'
import TabsTable from './TabsTable.vue'
import UserDialog from './Dialogs/UserDialog.vue'
const pdf = '/icons/PDF.ico'
const excel = '/icons/Excel.ico'

const search = ref('')
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

<style >
.v-checkbox .v-selection-control {
  min-height: 0 !important;
}
.v-input__details {
  display: none !important;
}
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
  .control {
    justify-content: center !important;
  }
}

@media (max-width: 960px) {
  .control {
    justify-content: center !important;
  }
  .card-height {
    height: 220px !important;
  }
}
</style>

<template>
  <div class="d-flex justify-content-between align-items-start">
    <!-- Left side items -->
    <div class="d-flex gap-2">
      <div style="position: relative; display: inline-block; width: 176px;">
        <!-- Search  -->
        <input
          type="text"
          style="width: 100%; height: 40px; padding-left: 35px;"
          class="rounded border"
          v-model="search"
          placeholder="Search"
        />
        <v-icon
          icon="mdi-magnify"
          style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 20px; color: gray;"
        />
      </div>
      <Multiselect
        v-model="all"
        :options="items"
        style="height: 36px; width: 176px;"
      />
      <!-- Tags -->
      <Multiselect
        v-model="selectedTags"
        mode="tags"
        placeholder="Tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="true"
        :options="tags"
        style="height: 36px; width: 306px;"
      />
      <!-- Export -->
      <div class="dropdown rounded border gray">
        <button
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="width: 55px; text-align: center; height: 100%; background-color: light-100;"
        >
          Export
        </button>
        <ul
          class="dropdown-menu w-100"
          aria-labelledby="dropdownMenuButton1"
        >
          <li
            class="mb-1 cursor-pointer"
            v-for="(item, index) in btnItems"
            :key="item"
          >
            <img
              :src="icons[index]"
              alt="icon"
              class="icon-img"
              style="width: 24px; height: 24px; object-fit: contain;"
            />
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- Refresh -->
      <button
        class="rounded border"
        style="width: 30px; text-align: center; height: 40px; background-color: light-100; color: gray;"
      >
        <v-icon icon="mdi-refresh"></v-icon>
      </button>
    </div>

    <!-- Settings Menu (right-aligned) -->
    <div style="position: relative; display: inline-block;">
      <button
        class="rounded border"
        style="width: 30px; text-align: center; height: 40px; background-color: light-100; color: gray;"
        @click="showSettingsMenu = !showSettingsMenu"
      >
        <v-icon icon="mdi-cog"></v-icon>
      </button>
      <div
        v-if="showSettingsMenu"
        class="settings-dropdown"
      >
        <div class="dropdown-header">Choose Columns</div>
        <div class="checkbox-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.Name"
            />
            <span class="label-text">Name</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.LastUpdate"
            />
            <span class="label-text">Last Update</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.Status"
            />
            <span class="label-text">Status</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.Odometer"
            />
            <span class="label-text">Odometer</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.LicenseExp"
            />
            <span class="label-text">License Exp</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.LicenseExp"
            />
            <span class="label-text">test</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.LicenseExp"
            />
            <span class="label-text">test</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="checkbox"
              v-model="selectedSettings.LicenseExp"
            />
            <span class="label-text">test</span>
          </label>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Multiselect from '@vueform/multiselect'

const pdf = '/icons/output-onlinepngtools (1).ico'
const excel = '/icons/Excel.ico'
const icons = [pdf, excel]
const btnItems = ['Export as PDF', 'Export as Excel']

const items = ['All', 'licenses expired', 'licenses not expired', 'with tracking']
const tags = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5']

const all = ref('All')
const search = ref('')
const selectedTags = ref([])
const selectedSettings = ref({
  Name: false,
  LastUpdate: false,
  Status: false,
  Odometer: false,
  LicenseExp: false
})
const showSettingsMenu = ref(false)
</script>

<style>
.icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 8px;
}

.settings-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  width: 200px;
  max-height: 200px;
  overflow-y: auto;
  display: block;
}
.dropdown-header {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.checkbox-group {
  padding: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.checkbox {
  width: 20px;
  height: 20px;
  appearance: none;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
  outline: none;
  cursor: pointer;
  position: relative;
}

.checkbox:checked {
  background-color: green;
}

.checkbox:checked::before {
  content: '✓';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
}

.label-text {
  margin-left: 10px;
}
</style>

<template>
  <div class="dropdown">
    <a
      class="btn dropdown-toggle d-flex align-items-center"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style="background-color: #f0f0f0; color: black; text-decoration: none"
    >
      <div
        class="icon-circles me-2 justify-content-center"
        :style="{ backgroundColor: circleColor }"
      >
        {{ firstLetters }}
      </div>
      {{ name }}
    </a>

    <ul class="dropdown-menu dropdown-menu-end">
      <li class="dropdown-item justify-content-center d-flex">
        <IcoDropdown :color="circleColor">
          <template #default> {{ firstLetters }}</template>
        </IcoDropdown>
      </li>

      <li class="dropdown-item text-center">
        <strong>{{ name }}</strong>
      </li>

      <li class="dropdown-item text-center">
        <small>{{ description }}</small>
      </li>

      <li class="text-center border-bottom">
        <button class="btn border d-flex p-2 mx-auto mb-8">Edit Profile</button>
      </li>

      <li class="border-bottom">
        <a
          class="dropdown-item mt-4 mb-4"
          href="#"
        >Switch Accounts</a>
      </li>

      <li>
        <a
          class="dropdown-item mt-3"
          href="#"
        >Logout</a>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import IcoDropdown from './IcoDropdown.vue'

const props = defineProps({
  name: String,
  description: String
})

const firstLetters = computed(() => {
  return props.name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
})

const circleColor = ref(generateRandomColor())

function generateRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
</script>

<style>
.icon-circles {
  border-radius: 50%;
  padding: 10px;
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.dropdown-toggle:hover {
  background-color: #6c757d;
  color: #ffffff;
  text-decoration: none;
}

.dropdown-toggle:focus,
.dropdown-toggle:active {
  box-shadow: none;
}

.dropdown-menu {
  width: 100%;
  max-width: 340px;
}

.dropdown-menu li.text-center {
  text-align: center;
}

.btn {
  border-radius: 5px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .dropdown-menu {
    width: 340px;
  }
}
</style>

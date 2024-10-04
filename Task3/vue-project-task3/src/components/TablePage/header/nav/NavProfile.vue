<template>
  <div class="dropdown me-11 position-relative">
    <a
      class="btn dropdown-toggle d-flex align-items-center ps-5"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style="color: black; text-decoration: none; border-radius: 40px;"
    >
      <div
        class="icon-circles-p position-absolute left-0"
        :style="{ backgroundColor: circleColor }"
      >
        {{ firstLetters }}
      </div>
      <span class="dropdown-name ms-4">{{ name }}</span>
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
        <button class="btn border d-flex p-2 mx-auto mb-8 fw-medium gray">Edit Profile</button>
      </li>

      <li class="border-bottom">
        <a
          class="dropdown-item mt-4 mb-4 gray"
          href="#"
        >Switch accounts</a>
      </li>

      <li>
        <a
          class="dropdown-item mt-3 fw-medium"
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
    .map((word) => word.charAt(0).toUpperCase())
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

<style scoped>
.icon-circles-p {
  border-radius: 50%;
  padding: 10px;
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.dropdown-toggle {
  padding-left: 50px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-toggle:hover {
  background-color: #e0e0e0;
  color: #000000;
  border-radius: 40px;
}

.dropdown-toggle:focus,
.dropdown-toggle:active {
  box-shadow: none;
}

.dropdown-menu {
  width: 90%;
  max-width: 310px;
}

.dropdown-menu li.text-center {
  text-align: center;
}

.btn {
  border-radius: 5px;
}

.gray {
  color: gray !important;
}
.dropdown-toggle {
  padding-left: 50px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  border-radius: 40px;
}

.dropdown-toggle:hover,
.dropdown-toggle:focus,
.dropdown-toggle:active {
  background-color: #dfe7ee;
  color: #000000;
  border-radius: 40px;
  text-decoration: none;
}

.dropdown-toggle:focus {
  box-shadow: none;
}

@media (min-width: 768px) {
  .dropdown-menu {
    width: 340px;
  }
}
</style>

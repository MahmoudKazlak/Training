<template>
  <div
    class="icon-circle me-3"
    v-if="$slots.default"
    :style="{ backgroundColor: color }"
  >
    <slot name="default">Icon</slot>
  </div>

  <!-- ----------------------- -->
  <div
    class="dropdown"
    v-if="$slots.drop"
  >
    <button
      class="btn border-0"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <div class="icon-circle me-3">
        <slot name="drop"></slot>
      </div>
    </button>
    <ul
      class="dropdown-menu dropdown-menu-end w-100"
      aria-labelledby="dropdownMenuButton1"
    >
      <li
        class="ml-2 mb-1 cursor-pointer"
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
  <!-- ---------------------------------------------------------------- -->
  <div
    class="dropdown"
    v-if="$slots.dropBtn"
  >
    <button
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <slot name="dropBtn"></slot>
    </button>
    <ul
      class="dropdown-menu w-100"
      aria-labelledby="dropdownMenuButton1"
    >
      <li
        class="ml-2 mb-1 cursor-pointer"
        v-for="(item, index) in items"
        :key="item"
      >
        <img
          :src="icons[index]"
          alt="icon"
          class="me-2 icon-img"
        />
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script setup>
defineProps({ color: String, items: Array, icons: Array })
</script>
<style>
.icon-circle {
  background-color: #f0f0f0;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.dropdown-menu {
  right: 0;
  left: auto;
  z-index: 1050;
}

.btn:focus,
.btn:active {
  box-shadow: none;
  border: none;
}

.btn:focus {
  outline: none;
}
.icon-img {
  width: 20px;
  height: 20px;
}
</style>

<template>
  <nav class="navbar navbar-light bg-light fixed-top border-bottom">
    <div class="container px-3 rowRev ">
      <span class="navbar-brand mb-0 h1">{{ $t('Units') }}</span>
      <div class="d-flex align-items-center rowRev">
        <slot></slot>
      </div>
    </div>
  </nav>
</template>


<style>
.navbar-light{
background-color: #eff4f9;
}


</style>


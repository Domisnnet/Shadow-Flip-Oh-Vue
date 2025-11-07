<template>
  <header>
    <h1>Shadow Flip Oh</h1>
  </header>
  <router-view />
</template>

<script setup>
// ... código JavaScript
</script>

<style scoped>
/* ESTE CSS SÓ AFETA O TEMPLATE ACIMA (h1, header) */
header {
  padding-top: 40px;
  padding-bottom: -50px;
  text-align: center;
}
h1 {
  color: #fff;
  font-size: 2em;
  margin: 0;
}
</style>
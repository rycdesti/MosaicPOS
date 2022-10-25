<template>
  <InvoiceMain/>
</template>

<script>
import InvoiceMain from './components/InvoiceMain.vue'

export default {
  name: 'App',
  components: {
    InvoiceMain
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

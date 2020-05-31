<template>
  <div id="app">
    <SalaryForm></SalaryForm>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SalaryForm from './components/SalaryForm.vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

@Component({
  components: {
    SalaryForm
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
  $background: rgba(32, 0, 109, 0.63);

  body {
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 1em;
    background: $background;
    box-sizing: border-box;

    * {
      box-sizing:border-box;
    }
  }
</style>

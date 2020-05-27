<template>
  <form class="simple-form"  @submit="onSubmit">
    <h2>{{ title }}</h2>
    <input class="simple-form__input" type="number" placeholder="Brutto per Year in Euro " v-model="amount"/>
    <button class="simple-form__button" :disabled="!amount" type="submit">Submit</button>

  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SimpleForm extends Vue {
  @Prop() public title!: string;
  amount = 0;

  onSubmit (event: Event): void {
    this.$emit('amountSelected', this.amount)
    event.preventDefault()
  }
}
</script>

<style lang="scss" scoped>

  .simple-form {
    display: flex;
    flex-direction: column;

    &__input {
      display: block;
      border: none;
      width: 100%;
      padding: 15px 20px;
      box-sizing:border-box;
      margin-bottom: 15px;
    }
    &__button {

      padding: 15px 20px;
      background: #222222;
      color: #ffffff;
      font-weight: bold;
      border: none;

      &:disabled {
        opacity: 0.4;
      }

      &:hover {
        background: #000000;
      }
    }
  }
</style>

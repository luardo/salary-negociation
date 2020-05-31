<template>
  <form class="simple-form"  @submit="onSubmit">
    <label class="simple-form__label">{{ title }}
      <input class="simple-form__input" type="number" ref="field"
             @focus="amount= null"
            v-model="amount"/>
      <i class="simple-form__help">Brutto per Year in Euro</i>
    </label>
    <button class="simple-form__button" :disabled="!amount" type="submit">Submit</button>

  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SimpleForm extends Vue {
  @Prop() public title!: string;
  amount = 0;

  mounted (): void {
    (this.$refs.field as Vue & { focus: () => boolean }).focus()
  }

  onSubmit (event: Event): void {
    this.$emit('amountSelected', this.amount)
    event.preventDefault()
  }
}
</script>

<style lang="scss" scoped>

  $fontSize: 1.25em;
  .simple-form {
    display: flex;
    flex-direction: column;

    &__label {
      font-size: 18px;
      font-weight: bold;
      text-align: left;
      margin-top: 15px;
      margin-bottom: 15px;
    }

    &__help {
      font-size: 14px;
      color: #222222;
      font-weight: lighter;
    }

    &__input {
      display: block;
      border: none;
      font-size: $fontSize;
      width: 100%;
      padding: 15px 20px;
      box-sizing:border-box;
      margin-top: 15px;
    }
    &__button {
      padding: 15px 20px;
      background: #222222;
      color: #ffffff;
      font-size: $fontSize;
      font-weight: bold;
      border: none;
      text-transform: uppercase;

      &:disabled {
        opacity: 0.4;
      }

      &:hover {
        background: #000000;
      }
    }
  }
</style>

<template>
  <div class="form-container">
    <div class="form-container__header">
      <div class="form-container__tab"
           v-bind:class="{ active : showEmployerForm }"
           @click="showEmployerForm = true">
        Employer Tab
      </div>
      <div class="form-container__tab"
           v-bind:class="{ active : !showEmployerForm }"
           @click="showEmployerForm = false">
        Employee Tab
      </div>
    </div>
    <div class="form-container__content">

      <SimpleForm title="How much do you want?" v-if="!showEmployerForm" :key="1"
            v-on:amountSelected="onCandidateSalarySubmitted($event)"></SimpleForm>
      <SimpleForm title="How much can you pay?" v-if="showEmployerForm" :key="2"
            v-on:amountSelected="onEmployerSalarySubmitted($event)"></SimpleForm>
    </div>

    <Modal v-if="showResult" :text="successMessage"></Modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SimpleForm from './SimpleForm.vue'
import Modal from './Modal.vue'

@Component({
  components: {
    SimpleForm,
    Modal
  }
})
export default class SalaryForm extends Vue {
    showEmployerForm = true;
    candidateSalary = 0;
    employerSalary = 0;

    get showResult () {
      return !!this.candidateSalary && !!this.employerSalary
    }

    get isSuccess (): boolean {
      return this.candidateSalary <= this.employerSalary
    }

    get successMessage (): string {
      return this.isSuccess ? 'Congratulation, we have a deal'
        : 'We are sorry, unfortunately there are other candidate with a more fitting profile. Good luck next time'
    }

    onCandidateSalarySubmitted (e: number): void {
      this.candidateSalary = e
    }

    onEmployerSalarySubmitted (e: number): void {
      this.showEmployerForm = false
      this.employerSalary = e
    }
}
</script>

<style lang="scss" scoped>
$background: rgba(76,138,185,0.63);
.form-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__tab {
    font-weight: bold;
    background: none;
    color: #222222;
    padding: 30px;
    flex-grow: 1;
    border: 1px solid #222222;
    border-bottom: none;

    &.active {
      background: #222222;
      color: white;
    }
  }

  &__content {
    margin-bottom: 60px;
  }
}
</style>

<template>
  <div>
    <div class="form-container" v-if="!displayWeather">
      <div class="form-container__header">
        <div class="form-container__tab"
             v-bind:class="{ 'form-container__tab--active' : showEmployerForm }"
             @click="showEmployerForm = true">
          Employer
        </div>
        <div class="form-container__tab"
             v-bind:class="{ 'form-container__tab--active' : !showEmployerForm }"
             @click="showEmployerForm = false">
          Candidate
        </div>
      </div>

      <div class="form-container__content">
        <SimpleForm title="How much do you want?" v-if="!showEmployerForm" :key="1"
              v-on:amountSelected="onCandidateSalarySubmitted">
        </SimpleForm>

        <SimpleForm title="How much can you pay?" v-if="showEmployerForm" :key="2"
              v-on:amountSelected="onEmployerSalarySubmitted">
        </SimpleForm>
      </div>

      <Modal v-if="showResult" :text="resultMessage" v-on:close="onModalClose"></Modal>
    </div>

    <div v-if="displayWeather">
      <h2> Have a nice day in London</h2>

      <h3> {{ currentWeather }} °C</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import SimpleForm from './SimpleForm.vue'
import { WeatherService } from '../mixins/WeatherService'
import Modal from './Modal.vue'

@Component({
  components: {
    SimpleForm,
    Modal
  }
})
export default class SalaryForm extends mixins(WeatherService) {
    showEmployerForm = true;
    displayWeather = false;
    candidateSalary = 0;
    employerSalary = 0;
    currentWeather = {};

    beforeMount (): void {
      this.getWeather()
    }

    get showResult (): boolean {
      return !!this.candidateSalary && !!this.employerSalary
    }

    get isSuccess (): boolean {
      return this.candidateSalary <= this.employerSalary
    }

    get resultMessage (): string {
      return this.isSuccess ? 'Congratulation, we have a deal'
        : 'We are sorry, unfortunately there are other candidate with a more fitting profile. Good luck next time'
    }

    async getWeather () {
      try {
        const { data: { main: { temp } } } = await this.getByCity('london')
        this.currentWeather = Math.floor(temp)
      } catch (ex) {
        console.log(ex)
      }
    }

    onModalClose () {
      this.displayWeather = true
      this.candidateSalary = 0
      this.employerSalary = 0
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
    padding: 30px;
    flex-grow: 1;
    border: none;

    background: #222222;
    color: white;

    &--active {
      color: #222222;
      background: none;

    }
  }

  &__content {
    margin-bottom: 60px;
  }
}
</style>

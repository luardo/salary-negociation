<template>
  <section>
    <div class="form-container" v-if="showNegociationForm">
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
        <SimpleForm title="Insert the position maximun budget: " v-if="showEmployerForm" :key="2"
              v-on:amountSelected="onEmployerSalarySubmitted">
        </SimpleForm>
        <SimpleForm title="Insert your expected salary: " v-if="!showEmployerForm" :key="1"
                    v-on:amountSelected="onCandidateSalarySubmitted">
        </SimpleForm>
      </div>

      <Modal v-if="showResult"
             :text="resultMessage"
             :candidate-expectation="candidateSalary"
             :employer-offer="employerSalary"
             :temp="currentWeatherTemp" v-on:close="onModalClose">
      </Modal>
    </div>
    <div v-if="!showNegociationForm">
      <h2>Bye!!!</h2>
    </div>
  </section>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import SimpleForm from './SimpleForm.vue'
import { WeatherMixin } from '../mixins/WeatherMixin'
import Modal from './Modal.vue'

@Component({
  components: {
    SimpleForm,
    Modal
  }
})
export default class SalaryForm extends mixins(WeatherMixin) {
    showEmployerForm = true;
    showNegociationForm = true;
    displayWeather = false;
    candidateSalary = 0;
    employerSalary = 0;
    currentWeatherTemp = 0;

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
      return this.isSuccess ? 'Success'
        : 'Failure'
    }

    async getWeather () {
      try {
        const { data: { main: { temp } } } = await this.getByCity('london')
        this.currentWeatherTemp = Math.floor(temp)
      } catch (err) {
        console.log(err)
      }
    }

    onModalClose () {
      this.showNegociationForm = false
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
$padding: 30px;
$maxWidth: 640px;
$primaryColor: #222222;
$secondaryColor: #FFFFFF;
$borderSize: 3px;
$contentMarginBottom: 60px;

.form-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: $padding;
  max-width:$maxWidth;
  margin: 0 auto;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__tab {
    font-weight: bold;
    padding: $padding;
    flex-grow: 1;
    border: none;
    background: none;
    color: $primaryColor;

    &--active {
      color: $secondaryColor;

      border-bottom: $borderSize solid $secondaryColor;
    }
  }

  &__content {
    margin-bottom: $contentMarginBottom;
  }
}
</style>

<template>
  <div class="modal">
    <div class="modal__header"><span class="modal__close" @click="close()">x</span></div>
    <h2>{{ text }}</h2>
    <p>
      <strong>Employers Offer:</strong> {{ employerOffer | currency }} <br/>
      <strong>Candidate Expectation:</strong> {{ candidateExpectation | currency }}
    </p>
    <h5>Weather in London</h5>
    <h3>{{ temp }}°C</h3>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['text', 'temp', 'employerOffer', 'candidateExpectation'],
  methods: {
    close () {
      this.$emit('close', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    background: white;
    margin: 0 20px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px;
    height: 50vh;
    transform: translateY(-50%);

    &__header {
      text-align: right;
      font-weight: bold;
    }

    &__close {
      font-size: 1.5em;
      cursor: pointer;
    }
  }
</style>

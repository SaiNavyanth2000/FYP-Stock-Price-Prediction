<template>
  <div id="app">
    <h3>Stock Price Prediction</h3>
    <b-form @submit="submit">
      <b-form-group
        id="input-group-1"
        label="Select the stock ticker you want the prediction for"
        label-for="input-1"
      >
        <b-form-select
          v-model="selected"
          :options="options"
          size="sm"
          class="mt-3"
          placeholder="Select one stock"
        ></b-form-select>
        <div class="mt-3">
          Ticker of the selected company: <strong>{{ selected }}</strong>
        </div>
      </b-form-group>
      <b-button @click="submit" id="button-1" type="button" variant="dark">Predict </b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: 'AAPL', text: 'Apple' },
        { value: 'AMZN', text: 'Amazon' },
        { value: 'MSFT', text: 'Microsoft Corp' },
        { value: 'FB', text: 'Meta Platforms' },
        { value: 'TSLA', text: 'Tesla' },
        { value: 'NVDA', text: 'NVIDIA Corp' },
      ],
      stockPrice: null,
    };
  },
  methods: {
    submit() {
      this.$router.push({
        name: 'PredictPrice',
        params: { selected: this.selected, company: this },
      });
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Castoro&display=swap');
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#input-group-1 {
  margin-left: 25%;
  margin-bottom: 20px;
  width: 50%;
  margin-top: 50px;
  font-weight: bold;
}
h3 {
  margin-left: 40%;
  margin-top: 20px;
  font-family: 'Castoro', serif;
}
#input-group-2 {
  margin-left: 25%;
  margin-bottom: 20px;
  width: 50%;

  font-weight: bold;
}
#button-1 {
  margin-left: 25%;
  margin-top: 1%;
}
.nav-bar {
  padding-left: 50px;
}
.link {
  padding-right: 100px;
  font-size: 20px;
  color: white;
}
</style>

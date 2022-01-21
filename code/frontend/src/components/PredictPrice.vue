<template>
  <div id="app">
    <div class="d-flex justify-content-center mb-3">
        <b-spinner v-if="loading" class="m-50"></b-spinner>
    </div>
    <Chart v-if="!loading" :chartData="stockData" />
    <br />
    <p v-if="!loading">The prediction for tomorrow is: $<span> {{prediction}} </span></p>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from './Chart.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  components: {
    Chart,
  },
  data() {
    return {
      selected: this.$router.currentRoute.params.selected,
      prediction: null,
      stockPrice: null,
      loading: true,
    };
  },
  methods: {
    back() {
      this.$router.push('/');
    },
    async getData() {
      const path = 'http://127.0.0.1:5000/predict';
      console.log(path, this.selected);
      axios
        .get(path, {
          params: {
            ticker: this.selected,
          },
        })
        .then((response) => {
          this.loading = false;
          this.stockPrice = response;
          this.prediction = this.stockPrice.data.prediction_value;
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.push('/predict');
    },
  },
  computed: {
    stockData() {
      return {
        // converted date string in the right format this way: https://www.codegrepper.com/code-examples/javascript/convert+timestamp+to+dd%2Fmm%2Fyyyy+in+javascript
        labels: Object.keys(JSON.parse(this.stockPrice.data.past_100_days))
          .map((a) => new Date(a / 1).toISOString().split('T')[0]),
        datasets: [{
          label: `Prices of ${this.selected} for the past 100 days`,
          // backgroundColor: '#f87979',
          data: Object.values(JSON.parse(this.stockPrice.data.past_100_days)),
          backgroundColor: 'white',
        }],
      };
    },
  },
  async created() {
    await this.getData();
  },
};
</script>

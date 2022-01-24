<template>
<!-- https://stackoverflow.com/questions/11895476/bootstrap-element-100-width -->
  <div class="container-fluid" style="padding:5vw">
    <div class="row">
      <div class="col-5" v-if="!loading">
        <h4 style="margin-left:0"> Select which model you would want to run your code on: </h4>
        <b-form-select
          v-model='select'
          :options='options'
          size='lg'
          class='mt-3'
          placeholder='Select one model'
        ></b-form-select>
        <br><br><br><br><br><br><br><br>
        <h4 v-if="!loading" style="margin-left:0">
      The predicted price of {{ selected}} for tomorrow is: $<span>{{ prediction }}</span>
    </h4>
    <br><br><br>
    <b-button v-if="!loading" @click='back' id='button-2'
    style="margin-left:10" type='button' variant='dark'
        >Back
        </b-button
      >
        </div>
      <div v-if="loading" class="d-flex justify-content-center mb-3" >
        <b-spinner v-if="loading" class="m-50 flex flex-center"></b-spinner>
      </div>
      <div class="col-7" >
        <Chart v-if="!loading" :chartData="stockData" />
      </div>
    </div>
    <br />
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
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      options: [
        { value: 'LSTM', text: 'LSTM' },
        { value: 'ARIMA', text: 'ARIMA' },
        { value: 'Prophe', text: 'Prophet' },
        { value: 'ANN', text: 'Custom ANN' },
        { value: 'RF', text: 'Random Forest' },
      ],
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
        labels: Object.keys(JSON.parse(this.stockPrice.data.past_100_days)).map(
          (a) => new Date(a / 1),
        ).map((a) => `${a.getDate()} ${this.months[a.getMonth()]} ${a.getFullYear()}`),
        datasets: [
          {
            label: `Price of ${this.selected}`,
            // backgroundColor: '#f87979',
            data: Object.values(JSON.parse(this.stockPrice.data.past_100_days)),
            backgroundColor: '#5a96ee',
            borderColor: 'white',
          },
        ],
      };
    },
  },
  async created() {
    await this.getData();
  },
};
</script>
<style>
#button-2 {
  margin-left: 0%;
  margin-top: 1%;
}
</style>

<template>
  <!-- https://stackoverflow.com/questions/11895476/bootstrap-element-100-width -->
  <div id="container">
    <h3 v-if="!loading">Stock Price Prediction</h3>
    <div class="row" style="padding: 2vw">
      <div class="col-2"></div>
      <div class="col-6">
        <div class="row" style="max-width: 100%">
          <Chart v-if="!loading" :chartData="stockData" />
        </div>
        <br /><br />
        <div class="row">
          <br />
          <br />
          <br />
          <MultiLstm v-if="!loading" :stockdata="past50days" />
        </div>
      </div>

      <div class="col-2" v-if="!loading">
        <h4 style="margin-left: 0">Select which model you would want to run your code on:</h4>
        <b-form-select
          v-model="model_type"
          :options="options"
          size="lg"
          class="mt-3"
          placeholder="Select one model"
        ></b-form-select>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <h4 v-if="!loading" style="margin-left: 0">
          The predicted price of {{ selected }} for tomorrow is:
          <span id="prediction" :style="`color:${color}`"> ${{ prediction }}</span>
        </h4>
        <b-button
          v-if="!loading"
          @click="back"
          id="button-2"
          style="margin-left: 10"
          type="button"
          variant="dark"
          >Back
        </b-button>
      </div>
      <div v-if="loading" class="d-flex justify-content-center mb-3">
        <b-spinner v-if="loading" class="m-50 flex flex-center"></b-spinner>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from './Chart.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import MultiLstm from './MultiLstm.vue';

export default {
  components: {
    Chart,
    MultiLstm,
  },
  data() {
    return {
      selected: this.$router.currentRoute.params.selected,
      model_type: 'lstm',
      prediction: null,
      stockPrice: null,
      previousDayPrice: null,
      past50days: null,
      color: null,
      loading: true,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      options: [
        { value: 'lstm', text: 'LSTM' },
        { value: 'ANN', text: 'Custom ANN' },
        { value: 'MultiLstm', text: 'Multivariate LSTM' },
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
            model_type: this.model_type,
          },
        })
        .then((response) => {
          this.loading = false;
          this.stockPrice = response;
          this.prediction = this.stockPrice.data.prediction_value;
          this.past50days = JSON.parse(this.stockPrice.data.past_50_days);
          console.log('past 50 days data');
          console.log(this.past50days);
          console.log(Object.values(this.past50days['Adj Close']));
          const array = Object.values(JSON.parse(this.stockPrice.data.past_100_days));
          console.log(this.previousDayPrice, array);
          this.previousDayPrice = array[array.length - 1];
          console.log(this.previousDayPrice);

          if (this.previousDayPrice > this.prediction) {
            this.color = 'red';
          } else {
            this.color = 'green';
          }
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
          .map((a) => new Date(a / 1))
          .map((a) => `${a.getDate()} ${this.months[a.getMonth()]} ${a.getFullYear()}`),
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
  watch: {
    model_type() {
      this.loading = true;
      this.getData();
      // this.loading = false
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
#container {
  margin: 2vw;
}
h3 {
  font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: '800';
}
#chart {
  text-align: right;
  border: 'solid red 1px';
}
h4,
p,
span {
  font-family: 'Castoro', serif;
}
</style>

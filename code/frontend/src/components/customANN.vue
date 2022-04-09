<template>
  <div id="app">
    <p>
      Trained a fully connected neural network.
    </p>
    <p>
      Based on various information gained from today's stock price, the model will predict
      the next day's closing price.
    </p>
    <br /><br />
    <p>
      The features used to train our model are:
    </p>
    <ul>
      <li>High - Low (difference between the two)</li>
      <li>Open - Close (difference between the two</li>
      <li>5 day moving average</li>
      <li>10 day moving average</li>
      <li>20 day moving average</li>
      <li>7 day standard deviation</li>
      <li>RSI with 14 periods</li>
      <li>8 day exponential moving average</li>
      <li>21 day exponential moving average</li>
      <li>34 day exponential moving average</li>
      <li>55 day exponential moving average</li>
      <li>Daily Returns (or) Percent change</li>
      <li>Trading Volume</li>
    </ul>
    <br />
    <p>
      Different models have been trained with different layers. After
      hyperparameter tuning, this is the best model for stock price data:
    </p>
    <img src="../.././public/assets/images/multi_lstm/model_summary.jpg" />

    <div class="table-wrapper-scroll-y my-custom-scrollbar mt-5">
      <table
        class="table table-bordered table-striped"
        v-if="Object.keys(stockdata).length > 0"
      >
        <thead>
          <tr>
            <th
              v-for="(key, index) in Object.keys(Object.values(stockdata)[0])"
              :key="index"
            >
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(key, index) in Object.values(stockdata)" :key="index">
            <td v-for="(key2, index2) in Object.values(key)" :key="index2">
              {{ parseFloat(key2).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stockdata: Object,
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.stockdata);
    // console.log(Object.values(this.stockdata['Adj Close']));
  },
};
</script>

<style>
.my-custom-scrollbar {
  position: relative;
  height: 20vh;
  overflow: auto;
}
.my-custom-scrollbar thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #ffffff;
}
.table-wrapper-scroll-y {
  display: block;
}
table {
  border: 'solid 10px black';
}
th {
  background: #ffffff;
}
</style>

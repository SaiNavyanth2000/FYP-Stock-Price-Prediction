<template>
  <div id="app">
    <p>
      LSTM (Long Short Term Memory) network has been trained with
      100 timestamps.
    </p>
    <p>So, this is how it splits the data:</p>
    <img src="../../public/images/multi_lstm/prediction_demo.jpg" />
    <p>
      Based on the past 100 days of data, the model will predict the closing
      price of the next day.
    </p>
    <br /><br />

    <p>
      Different models have been trained with different layers. After
      hyperparameter tuning, this is the best model for stock price data:
    </p>
    <img src="../../public/images/multi_lstm/model_summary.jpg" />

    <div class="table-wrapper-scroll-y my-custom-scrollbar mt-5">
      <table
        class="table table-bordered table-striped"

        v-if="stockdata !== null && stockdata !== undefined && Object.keys(stockdata).length > 0"
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
    console.log(this.stockdata);
    // this.stockdata = { abc: 'abcd' };
    // if (this.stockdata !== undefined && Object.keys(this.stockdata).length > 0) {
    //   console.log(Object.values(this.stockdata['Adj Close']));
    // }
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

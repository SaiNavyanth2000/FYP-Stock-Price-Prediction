function MultiLSTM(){
    return(
    <div id="app">
    <p>
      Multivariate LSTM (Long Short Term Memory) network has been trained with
      7 timestamps.
    </p>
    <p>So, this is how it splits the data:</p>
    <img src={process.env.PUBLIC_URL+"images/multi_lstm/prediction_demo.jpg"} />
    {/* <img src="../../../public/images/multi_lstm/prediction_demo.jpg" /> */}
    <p>
      Based on the past 7 days of data, the model will predict the closing
      price of the next day.
    </p>
    <br /><br />
    <p>
      In mltivariate LSTM the prediction is based on multiple features. The
      features used to train our model are:
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

    {/* <div class="table-wrapper-scroll-y my-custom-scrollbar mt-5">
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
    </div>*/}
  </div> 
    )
}

export default MultiLSTM;
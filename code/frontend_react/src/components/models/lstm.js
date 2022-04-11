function LSTM() {
  return (
    <div id="app">
      <div>
        <h2 style={{ marginBottom: '50px' }}>Summary: </h2>
        <p>
          LSTM (Long Short Term Memory) network has been trained with 100
          timestamps.
        </p>
        <p>So, this is how it splits the data:</p>
        <img
          src={process.env.PUBLIC_URL + 'images/multi_lstm/prediction_demo.jpg'}
        />
      </div>
      <div style={{ marginTop: '100px' }}>
        <p>
          Based on the past 100 days of data, the model will predict the closing
          price of the next day.
        </p>

        <p>
          Different models have been trained with different layers. After
          hyperparameter tuning, this is the best model for stock price data:
        </p>
        <img
          src={process.env.PUBLIC_URL + 'images/multi_lstm/model_summary.jpg'}
        />
      </div>
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
  );
}

export default LSTM;

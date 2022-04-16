import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';
import LSTM from './models/lstm';
import MultiLSTM from './models/multi_lstm';
import ButtonAppBar from './AppBar';
import Chart from './Chart';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

function PredictPrice() {
  const location = useLocation();
  console.log(location.state);

  const [ModelType, setModelType] = useState('lstm');
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');
  const [isLstmComponent, setLstmComponent] = useState(true);
  const [isMultiLstm, setMultiLstm] = useState(false);
  const [color, setColor] = useState('rgba(75,192,192,1)');
  // const [tick, setTick] = useState(ticker);
  const [tick, setTick] = React.useState(
    location.state.ticker ? location.state.ticker : 'AAPL'
  );
  console.log(tick);

  useEffect(() => {
    const form_data = {
      ticker: tick,
      model_type: ModelType,
    };
    setLoading(true);
    fetch('https://fyp-backend-sai.herokuapp.com/predict', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form_data),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        console.log(result);
        const array = Object.values(JSON.parse(data.past_100_days));
        const previousDayPrice = array[array.length - 1];
        const prediction = result.prediction_value;

        if (previousDayPrice > prediction) {
          setColor('red');
        } else {
          setColor('rgba(75,192,192,1)');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ModelType, tick]);

  const handleChangeTicker = (event) => {
    setTick(event.target.value);
    setLoading(false);
  };

  const handleChangeModel = (event) => {
    setLoading(true);

    setModelType(event.target.value);
    console.log(event.target.value);
    if (event.target.value === 'lstm') {
      // console.log(ModelType)
      setLstmComponent(true);
      setMultiLstm(false);
    } else if (event.target.value === 'multi_lstm') {
      console.log(ModelType);
      setMultiLstm(true);
      setLstmComponent(false);
    } else {
      setMultiLstm(false);
      setLstmComponent(false);
    }
    setLoading(false);
    console.log(ModelType);
  };

  const Loading = () => {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <div></div>
        </div>
        <h3 style={{ color: 'lightblue' }}> Loading ... </h3>
      </div>
    );
  };

  return (
    <Box id="app" margin="50px">
      {!loading ? (
        <>
          {/* <h3>Stock Price Prediction</h3> */}

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box width="65%" padding="30px">
              {!loading ? <Chart data={{ result }}></Chart> : null}
            </Box>

            <Box
              width="30%"
              marginTop="30px"
              marginBottom="30px"
              padding="30px"
              backgroundColor="#EFEFEF"
            >
              <h4>Select Company:</h4>
              <Select value={tick} fullWidth onChange={handleChangeTicker}>
                <MenuItem value={'GOOG'}>Google</MenuItem>
                <MenuItem value={'TSLA'}>Tesla</MenuItem>
                <MenuItem value={'GOOGL'}>Alphabet</MenuItem>
                <MenuItem value={'MSFT'}>Microsoft</MenuItem>
                <MenuItem value={'AAPL'}>Apple</MenuItem>
              </Select>
              <h4>Select Model:</h4>
              <Select value={ModelType} onChange={handleChangeModel} fullWidth>
                <MenuItem value={'lstm'}>LSTM</MenuItem>
                <MenuItem value={'ANN'}>Custom ANN</MenuItem>
                <MenuItem value={'multi_lstm'}>Multi LSTM</MenuItem>
              </Select>

              <Box marginTop="50px">
                <p>The model you selected is : {ModelType}</p>
                <p>
                  The predicted price of {tick} for tomorrow is:{' '}
                  <strong style={{ color: color }}>
                    {result.prediction_value}
                  </strong>
                </p>
              </Box>
            </Box>
          </Box>
          <Divider
            style={{ margin: '30px', marginBottom: '60px', marginTop: '100px' }}
          ></Divider>

          <Box margin="30px">
            {!loading && isLstmComponent ? (
              <LSTM></LSTM>
            ) : isMultiLstm ? (
              <MultiLSTM></MultiLSTM>
            ) : null}
          </Box>
          {/* {isMultiLstm ? } */}
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
}

export default PredictPrice;

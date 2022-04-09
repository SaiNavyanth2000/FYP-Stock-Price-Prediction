import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
// import { Chart } from 'react-chartjs-2'
import { Line } from "react-chartjs-2";
import Box from "@mui/material/Box";

// chart template: https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
function Chart(props) {
  // check this: https://stackoverflow.com/questions/67727603/error-category-is-not-a-registered-scale
  ChartJS.register(...registerables);
  console.log(props.data.result);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const state = {
    // converted date string in the right format this way: https://www.codegrepper.com/code-examples/javascript/convert+timestamp+to+dd%2Fmm%2Fyyyy+in+javascript
    labels: Object.keys(JSON.parse(props.data.result.past_50_days))
      .map((a) => new Date(a / 1))
      .map((a) => `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()}`),
    datasets: [
      {
        label: "Stock Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: Object.values(JSON.parse(props.data.result.past_50_days)),
      },
    ],
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: "Price of the stock in the previous 50 days",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </Box>
    </Box>
  );
}
export default Chart;

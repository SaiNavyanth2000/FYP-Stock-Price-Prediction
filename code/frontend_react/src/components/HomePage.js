import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "./AppBar";
import Box from "@mui/material/Box";

function Home() {
  const [tick, setTick] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event) => {
    setTick(event.target.value);
    setLoading(false);
  };

  let navigate = useNavigate();
  const handleSubmit = () => {
    let path = "/predict";
    navigate(path, { state: { ticker: tick } });
  };

  return (
    <div id="app">
      {/* <ButtonAppBar></ButtonAppBar> */}
      <h3>Stock Price Prediction</h3>
      <p>Select the company you want the prediction for:</p>

      <Box width="200px">
        <Select value={tick} fullWidth onChange={handleChange}>
          <MenuItem value={"GOOGL"}>Google</MenuItem>
          <MenuItem value={"TSLA"}>Tesla</MenuItem>
          <MenuItem value={"AMZN"}>Amazon</MenuItem>
          <MenuItem value={"MSFT"}>Microsoft</MenuItem>
          <MenuItem value={"AAPL"}>Apple</MenuItem>
        </Select>
      </Box>

      <br></br>
      <br></br>
      {!loading ? (
        <p>
          Ticker of the selected company: <strong>{tick}</strong>
        </p>
      ) : (
        <p>
          <br></br>
        </p>
      )}
      <br></br>
      <br></br>
      <Button variant="contained" onClick={handleSubmit}>
        Prediction
      </Button>
    </div>
  );
}

export default Home;

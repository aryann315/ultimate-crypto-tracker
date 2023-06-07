import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {Chart, registerables} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartDays } from "../services/chartDays";
import Button from "./Button";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function CoinInfo({ coinHistory, setTimeHandler, timePeriod }) {

  Chart.register(...registerables);

  const currency = useSelector((state) => state.currency.currency);
  const symbol = useSelector((state) => state.currency.symbol);
  const currencyMultiplier = useSelector((state) => state.currency.multiplier);

  const classes = useStyles();
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const price = coinHistory?.data?.history[i].price * currencyMultiplier;
    coinPrice.push(price);

    let date = new Date(coinHistory?.data?.history[i].timestamp * 1000);

    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    coinTimestamp.push(timePeriod === "24h" ? time : date.toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price in ${currency} (${symbol}) (past ${timePeriod})`,
        data: coinPrice,
        fill: false,
        backgroundColor: "#222831",
        borderColor: "#222831",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },

    elements: {
      point: {
        radius: 1,
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        <Line data={data} options={options} />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <Button
              key={day.value}
              onClick={() => setTimeHandler(day.label)}
              selected={day.label === timePeriod}
            >
              {day.label}
            </Button>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;

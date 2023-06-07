import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import CoinInfo from "../components/CoinInfo";
import { makeStyles } from "@mui/styles";
import { Typography, LinearProgress } from "@mui/material";
import millify from "millify";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: 890,
    backgroundColor: "#F1F6F9",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: 0,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 55,
    paddingLeft: 15,
    borderRight: "2px solid #222831",
  },
  marketData: {
    alignSelf: "start",
    paddingLeft: 5,
    paddingTop: 15,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {
  const classes = useStyles();
  const params = useParams();
  const id = params.id;
  const [timePeriod, setTimePeriod] = useState("24h");

  const { data } = useGetCryptoDetailsQuery(id);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ id, timePeriod });
  const [singleCoin, setSingleCoin] = useState(data?.data?.coin);

  const symbol = useSelector((state) => state.currency.symbol);
  const currencyMultiplier = useSelector((state) => state.currency.multiplier);

  useEffect(() => {
    setSingleCoin(data?.data?.coin);
  }, [data]);

  if (!singleCoin) return <LinearProgress sx={{ backgroundColor: "black" }} />;
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={singleCoin?.iconUrl}
          alt={singleCoin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, fontFamily: "Montserrat", color: "#222831" }}
        >
          {singleCoin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 3,
            paddingLeft: 1,
            fontSize: 19,
            fontWeight: 400,
            justifyContent: "space-around",
            color: "#222831",
          }}
        >
          {singleCoin?.description}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography
              sx={{ fontFamily: "Montserrat", color: "#222831", fontSize: 23 }}
            >
              <span style={{ fontWeight: 700 }}>Rank: </span>
              <span style={{ fontWeight: 500 }}>{singleCoin?.rank}</span>
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              sx={{ fontFamily: "Montserrat", color: "#222831", fontSize: 23 }}
            >
              <span style={{ fontWeight: 700 }}>Current Price: </span>
              <span style={{ fontWeight: 500 }}>
                {symbol} {millify(singleCoin?.price * currencyMultiplier)}
              </span>
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              sx={{ fontFamily: "Montserrat", color: "#222831", fontSize: 23 }}
            >
              <span style={{ fontWeight: 700 }}>Market Cap: </span>
              <span style={{ fontWeight: 500 }}>
                {symbol} {millify(singleCoin?.marketCap * currencyMultiplier)}
              </span>
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo
        coinHistory={coinHistory}
        setTimeHandler={setTimePeriod}
        timePeriod={timePeriod}
      />
    </div>
  );
};

export default CoinPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCryptosQuery } from "../services/cryptoApi";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { makeStyles } from "@mui/styles";
import millify from "millify";

const useStyles = makeStyles(() => ({
  coinRow: {
    backgroundColor: "#C9D6DF",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F1F6F9",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#222831",
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: 15,
    },
  },
}));

function CoinsTable() {
  const classes = useStyles();
  const navigate = useNavigate();
  const symbol = useSelector((state) => state.currency.symbol);
  const currencyMultiplier = useSelector((state) => state.currency.multiplier);

  const { data: coinsList, isFetching } = useGetCryptosQuery();
  const [coins, setCoins] = useState(coinsList?.data?.coins);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCoins(coinsList?.data?.coins);

    const filteredData = coinsList?.data?.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );

    setCoins(filteredData);
  }, [coinsList, search]);

  if (isFetching) return "Loading!";

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            margin: 3,
            fontFamily: "Montserrat",
            fontWeight: 700,
            color: "#222831",
          }}
        >
          Top 50 CryptoCurrencies
        </Typography>
        <TextField
          label="Search for any CryptoCurrency"
          variant="outlined"
          sx={{
            marginBottom: 3,
            width: "100%",
          }}
          onChange={searchChangeHandler}
          onFocus={() => this.onFocusFieldFirstName()}
        />
        <TableContainer sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#222831" }}>
              <TableRow>
                {[
                  "CryptoCurrency",
                  "Rank",
                  "Price",
                  "Daily Change",
                  "Market Cap",
                ].map((coin) => (
                  <TableCell
                    key={coin}
                    sx={{
                      color: "white",
                      fontSize: 22,
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                      textAlign: "center",
                    }}
                  >
                    {coin}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {coins
                ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((coin) => (
                  <TableRow
                    key={coin.name}
                    className={classes.coinRow}
                    onClick={() => {
                      navigate(`/coin/${coin.uuid}`);
                    }}
                  >
                    <TableCell
                      sx={{
                        display: "flex",
                        gap: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={coin?.iconUrl}
                        alt={coin.name}
                        height="50"
                        width="50"
                        style={{ marginBottom: 5 }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          gap: 5,
                          width: 25,
                        }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontFamily: "Montserrat",
                            fontSize: 15,
                            fontWeight: 700,
                          }}
                        >
                          {coin.symbol}
                        </span>
                        <span
                          style={{
                            fontFamily: "Montserrat",
                          }}
                        >
                          {coin.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          fontFamily: "Montserrat",
                          fontWeight: 500,
                          fontSize: 15,
                        }}
                      >
                        # {coin.rank}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: 15,
                      }}
                    >
                      {symbol} {millify(coin.price * currencyMultiplier)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: coin.change > 0 ? "#228B22" : "#cc0000",
                        fontWeight: 500,
                        fontSize: 15,
                        fontFamily: "Montserrat",
                      }}
                    >
                      {coin.change > 0 && "+"}
                      {coin.change}%
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: 15,
                      }}
                    >
                      {symbol} {millify(coin.marketCap * currencyMultiplier)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          sx={{
            paddingBottom: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          className={classes.pagination}
          count={coins?.length / 10 || 0}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </>
  );
}

export default CoinsTable;

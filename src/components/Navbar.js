import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currencyActions } from "../redux/currencySlice";
import { AppBar, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currency = useSelector((state) => state.currency.currency);

  const clickHandler = () => {
    navigate("/");
  };

  const currencyChangeHandler = (event) => {
    dispatch(currencyActions.changeCurrency(event.target.value));
  };

  return (
    <AppBar sx={{ bgcolor: "#222831", height: 75 }} position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            onClick={clickHandler}
            sx={{
              color: "white",
              flex: 1,
              fontFamily: "Montserrat",
              fontSize: 25,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            The Ultimate Crypto Tracker
          </Typography>
          <Select
            onChange={currencyChangeHandler}
            value={currency}
            sx={{
              color: "#222831",
              bgcolor: "white",
              width: 105,
              height: 40,
              fontFamily: "Montserrat",
              fontWeight: 600,
            }}
          >
            <MenuItem value={"INR"}>INR ₹</MenuItem>
            <MenuItem value={"USD"}>USD $</MenuItem>
            <MenuItem value={"EUR"}>EUR €</MenuItem>
            <MenuItem value={"RUB"}>RUB ₽</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

import React from "react";
import { makeStyles } from "@mui/styles";

function Button({ children, selected, onClick }) {
  const useStyles = makeStyles({
    selectbutton: {
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#F1F6F9" : "#222831",
      color: selected ? "black" : "white",
      border: selected ? "222831" : "",
      fontWeight: 700,
      "&:hover": {
        backgroundColor: "#F1F6F9",
        color: "black",
      },
      width: "22%",
    },
  });
  const classes = useStyles();
  return (
    <button onClick={onClick} className={classes.selectbutton}>
      {children}
    </button>
  );
}

export default Button;

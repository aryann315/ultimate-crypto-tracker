import React from "react";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import Carousel from "./Carousel";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundColor: "#F1F6F9",
  },
  bannerContent: {
    height: 450,
    display: "flex",
    flexDirection: "column",
    paddingTop: 30,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 22,
  },
}));

function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h3"
            sx={{
              color: "#222831",
              fontWeight: 700,
              fontFamily: "Montserrat",
            }}
          >
            Latest News
          </Typography>
          <Typography
            variant="subtitle"
            sx={{
              color: "#222831",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontWeight: 600,
            }}
          >
            All the info regarding your favourite crypto just one click away
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;

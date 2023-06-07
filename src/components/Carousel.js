import React from "react";
import { makeStyles } from "@mui/styles";
import AliceCarousel from "react-alice-carousel";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Link } from "react-router-dom";
import { Avatar, Card, Typography } from "@mui/material";
import moment from "moment";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 300,
    width: "95%",
    padding: 15,
  },
}));

function Carousel() {
  const classes = useStyles();
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Crytpocurrency",
  });
  const responsive = {
    0: {
      items: 2,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={12000}
        animationDuration={4500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        keyboardNavigation
        responsive={responsive}
        items={cryptoNews?.value}
      >
        {cryptoNews?.value.map((news) => (
          <Link className={classes.carouselItem} to={news.url}>
            <Card
              className={classes.card}
              style={{ backgroundColor: "#222831" }}
            >
              <Typography
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "white",
                  height: 80,
                  textAlign: "center",
                }}
              >
                {news.name}
              </Typography>

              <Typography
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 14,
                  color: "white",
                  padding: 5,
                  height: 100,
                }}
              >
                {news.description.substring(0, 210)}...
              </Typography>
              <div style={{display: "flex", justifyContent:"space-between"}}>
                <div style={{ display: "flex", paddingTop: 10 }}>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    alt="news"
                    sx={{ maxWidth: 25, maxHeight: 25 }}
                  />
                  <Typography
                    style={{
                      fontFamily: "Montserrat",
                      color: "white",
                      fontWeight: 300,
                      paddingLeft: 12,
                    }}
                  >
                    {news.provider[0]?.name}
                  </Typography>
                </div>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 400,
                    paddingTop: 1.5,
                  }}
                >
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Typography>
              </div>
            </Card>
          </Link>
        ))}
      </AliceCarousel>
    </div>
  );
}

export default Carousel;

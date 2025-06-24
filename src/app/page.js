"use client";

import styles from "./page.module.css";
import {
  createTheme,
  ThemeProvider,
  Typography,
  styled,
  Divider,
  Container,
  Grid,
  Box,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
    fontWeightBold: "500",
    fontWeightRegular: "400",
    fontWeightMedium: "300",
    fontWeightLight: "200",
  },
  palette: {
    mode: "dark",
    success: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#100",
    },
  },
});

export default function Home() {
  const [languageState, setLanguageState] = useState("ar");
  const [dirState, setDirState] = useState("rtl");
  moment.locale(languageState);
  const {t, i18n} = useTranslation();

  const [weather, setWeather] = useState({
    country: "unknown",
    date: "0000/00/00",
    weatherState: "unknown",
    temp: null,
    temp_max: null,
    temp_min: null,
  });
  
  function handleLangChange() {
    if (languageState == "ar") {
      setLanguageState("en");
      setDirState("ltr");
    } else {
      setLanguageState("ar");
      setDirState("rtl")
    }
  }

  useEffect(() => {
    i18n.changeLanguage(languageState);
    
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2358&units=metric&appid=955d72cf3c714b5a1f90ab4896323eaf"
      )
      .then(function (response) {
        const myData = response.data;
        const theTime = moment().format("MMMM Do YYYY, h:mm:ss a");

        setWeather((w) => ({
          ...w,
          country: myData.sys.country,
          date: theTime,
          weatherState: myData.weather[0].description,
          weatherIcon: myData.weather[0].icon,
          temp: Math.round(myData.main.temp),
          temp_max: myData.main.temp_max,
          temp_min: myData.main.temp_min,
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [languageState]);

  return (
    <div
      className={styles.page}
      dir={dirState}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" color="success">
          <Card
            sx={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.051), rgba(255, 255, 255, 0.051)) !important",
              bgcolor: "transparent",
            }}
          >
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ m: "0 25px", height: "100%", lineHeight: "normal" }}
              >
                {t("Egypt")}
              </Typography>
              <Typography sx={{ m: "0 !important", height: "100%" }}>
                {weather.date}
              </Typography>
            </CardActions>
            <Divider variant="middle" />
            <CardContent sx={{ p: "15px !important" }}>
              <Grid container sx={{ p: "0 15px" }}>
                <Grid size={6}>
                  <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
                    <Typography
                      variant="h1"
                      fontWeight="light"
                      sx={{ textAlign: "right" }}
                    >
                      {weather.temp}
                    </Typography>
                    <img width={130} src={`https://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="light"
                      sx={{
                        textTransform: "capitalize",
                        display: "block",
                        m: "15px 0",
                      }}
                    >
                      {t(weather.weatherState)}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ textAlign: "right" }}>
                        {t("Minimum")}: {weather.temp_min}
                      </Typography>
                      <Typography variant="h5" sx={{ p: "0 5px" }}>
                        |
                      </Typography>
                      <Typography variant="h6" sx={{ textAlign: "right" }}>
                        {t("Maximum")}: {weather.temp_max}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  size={6}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CloudIcon sx={{ fontSize: "12.5rem" }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box sx={{ textAlign: "left", m: "15px 0" }}>
            <Button variant="text" onClick={() => handleLangChange()}>انجليزية</Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

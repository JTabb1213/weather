import { useEffect, useState } from "react";
import { useHttpClient } from "../HttpClient";
import {Alert, AlertTitle, Box, CircularProgress, Grid, Typography} from "@mui/material";
import Progress from "./Progress";
import image from "../image.png";
import image2 from "../image2.png";

function Weather({ city }) {
    const [weather, setWeather] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const httpClient = useHttpClient();
    const getWeather = async () => {
        httpClient.get(`/api/weather?units=imperial&city=${city}`).then(result => {
            setWeather(result.data);
            console.log(result.data);
        }).catch(err => {
            setError(err.response.data);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        if (city) {
            setWeather(null);
            setError(null);
            setLoading(true);
            getWeather();
        }
    }, [city]);
    return (
        <>
            {!loading && weather &&
                <Grid container direction="column" xs={12} justifyContent="center" alignItems="center">
                    <Grid item>
                        <h1 className="city">City: {weather.name} </h1>
                    </Grid>
                    <Grid item>
                        <h2 className="temp">Temp: {Math.round(weather.tempActual) + " F"}</h2>
                    </Grid>
                    <Grid item>
                        <h3 className="humidity">Humidity: {weather.humidity + " % humidity"}</h3>
                    </Grid>
                    <Grid item>
                        <h4 className="wind">Wind: {weather.windSpeed + " mph"}</h4>
                    </Grid>
                    <Grid item>
                        <h5 className="feelsLike">Feels
                            like: {Math.round(weather.tempFeelsLike) + " F"}</h5>
                    </Grid>
                    <Grid item>
                        <h6 className="clouds">{weather.skies + " skies"}</h6>
                    </Grid>
                </Grid>}
            {error &&
                <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Grid item fullWidth>
                    <Alert fullWidth severity="error" sx={{margin: '10px', width: '100%', minHeight: '85px'}}>
                        <AlertTitle>Error Fetching Weather</AlertTitle>
                        {error.message}
                    </Alert>
                    </Grid>
                </Grid>}
            {loading && !weather &&
                <Progress title="Fetching weather..." />}
        </>
    )
}

export default Weather;
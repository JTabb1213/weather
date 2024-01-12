import { useEffect, useState } from "react";
import { useHttpClient } from "../HttpClient";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
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
                <div className="weather" style={{ padding: '80px' }}>
                    <h1 className="city">City: {weather.name} </h1>
                    <h2 className="temp">Temp: {Math.round(weather.tempActual) + " F"}</h2>
                    <h3 className="humidity">Humidity: {weather.humidity + " % humidity"}</h3>
                    <h4 className="wind">Wind: {weather.windSpeed + " mph"}</h4>
                    <h5 className="feelsLike">Feels
                        like: {Math.round(weather.tempFeelsLike) + " F"}</h5>
                    <h6 className="clouds">{weather.skies + " skies"}</h6>

                    {weather.tempActual > 40 ? (
                        <div>
                            Fun activities given current temperature:
                            <br />
                            -apple picking
                            <img src={image} style={{ width: '400px', height: '400px' }} />
                        </div>
                    ) : (
                        <div>
                            Fun activities given current temperature:
                            <br />
                            -drink hot chocolate
                            <img src={image2} style={{ width: '400px', height: '400px' }} />
                        </div>
                    )}
                </div>}
            {error &&
                <div className="error">
                    <h1>Could not fetch the weather due to server error:</h1>
                    <h2>{error.message}</h2>
                </div>}
            {loading && !weather &&
                <Progress title="Fetching weather..." />}
        </>
    )
}

export default Weather;
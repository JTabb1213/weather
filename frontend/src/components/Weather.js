import {Grid} from "@mui/material";

function Weather({weather}) {
    return (
        <>
            {weather &&
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
        </>
    )
}

export default Weather;
import {Box, Grid} from "@mui/material";
import styles from '../css/weather.module.css';
import Card from "@mui/material/Card";

function getWeatherIcon(weather) {
    const localDate = new Date(weather.localTime);
    const hour = localDate.getUTCHours();
    const isDaytime = hour > 6 && hour < 17;
    const skies = weather.skies?.toLowerCase();
    let image = null;
    if (skies === 'clouds') {
        image = isDaytime ? 'clouds-day.png' : 'clouds-night.png';
    } else if (skies === 'clear') {
        image = isDaytime ? 'sun.png' : 'clear-night.png';
    } else if (skies === 'mist') {
        image = 'mist.png';
    } else if (skies === 'snow') {
        image = 'snow.png';
    } else if (skies === 'smoke') {
        image = 'smoke.png';
    } else if (skies === 'fog') {
        image = isDaytime ? 'fog-day.png' : 'fog-night.png';
    } else if (skies === 'partly cloudy') {
        image = isDaytime ? 'partly-cloudy-day.png' : 'partly-cloudy-night.png';
    } else if (skies === 'light snow') {
        image = 'light-snow.png';
    } else if (skies === 'thunderstorm') {
        image = isDaytime ? 'thunderstorm-day.png' : 'thunderstorm-night.png';
    } else if (skies === 'rain') {
        image = isDaytime ? 'rainy-day.png' : 'rainy-night.png';
    } else {
        image = 'unknown-weather.png'
    }
    return `/${image}`;
}

function Condition({value, image, unit}) {
    return <Grid item container alignItems="center"
                     sx={{paddingTop: '10px', flexWrap: 'nowrap'}} xs={8}>
        <Grid item>
            <img style={{maxHeight: '1.5em', maxWidth: '1.5em'}} src={image}/>
        </Grid>
        <Grid item container alignItems="end" sx={{flexWrap: 'nowrap'}} >
            <div className={styles.conditionValues}>{value}</div>
            <div className={styles.unitNames}>{unit}</div>
        </Grid>
    </Grid>
}

function Weather({weather}) {
    return (
        <>
            {weather &&
                <Grid container direction="column" sx={{padding: '10px', flexWrap: 'nowrap', backgroundColor: '#fff'}}>
                    <Grid item xs={1}>
                        <span className={styles.weatherTitle}>{weather.name} </span>
                    </Grid>
                    <Grid item container xs={6} justifyContent="center">
                        <Grid item container direction="column" alignItems="center" justifyContent="center" xs={4} sm={4}
                              md={4}>
                            <img className={styles.skiesImg} src={getWeatherIcon(weather)}/>
                            <div className={styles.condition}>{weather.skies}</div>
                        </Grid>
                        <Grid item container md={8} sm={8} xs={8} justifyContent="center" alignItems="center">
                            <Grid item container direction="column" alignItems="center" justifyContent="center" xs={6}>
                                <div className={styles.actualTemp}>{Math.round(weather.tempActual)}</div>
                                <div className={styles.feelsLike}>Feels
                                    like: {Math.round(weather.tempFeelsLike)}</div>
                            </Grid>
                            <Grid item container alignItems="end" justifyContent={{sm: 'center', xs: 'center'}} xs={6}>
                                <Condition value={weather.windSpeed} image="/wind.png" unit="mph"/>
                                <Condition value={weather.humidity} image="/humidity.png" unit="%"/>
                                {weather.pressure &&
                                    <Condition value={weather.pressure} image="/pressure.png" unit="mb"/>}
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>}
        </>
    )
}

export default Weather;
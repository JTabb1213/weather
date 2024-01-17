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
    return <Grid item container alignItems="center" justifyContent={{md: 'end', sm: 'center', xs: 'center'}}
                     sx={{paddingTop: '10px'}} xs={8}>
        <Grid item md={2}>
            <img style={{maxHeight: '1.5em', maxWidth: '1.5em'}} src={image}/>
        </Grid>
        <Grid item container alignItems="end" justifyContent={{xs: 'center', sm: 'start'}} md={5} sm={5}>
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
                    <Grid item container xs={7}>
                        <Grid item container direction="column" alignItems="center" justifyContent="center" xs={12} sm={4}
                              md={12}>
                            <img className={styles.skiesImg} src={getWeatherIcon(weather)}/>
                            <div className={styles.condition}>{weather.skies}</div>
                        </Grid>
                        <Grid item container md={12} sm={8} xs={12} justifyContent="center" alignItems="center">
                            <Grid item container direction="column" alignItems="center" justifyContent="center" xs={12}
                                  md={4} sm={5}>
                                <div className={styles.actualTemp}>{Math.round(weather.tempActual)}</div>
                                <div className={styles.feelsLike}>Feels
                                    like: {Math.round(weather.tempFeelsLike)}</div>
                            </Grid>
                            <Grid item container justifyContent="end" alignItems="end" sm={7} md={6} xs={12}>
                                <Grid item container direction={{xs: 'row' , sm: 'column'}} sx={{flexWrap: {xs: 'nowrap'}}}>
                                    <Condition value={weather.windSpeed} image="/wind.png" unit="mph"/>
                                    <Condition value={weather.humidity} image="/humidity.png" unit="%"/>
                                    {weather.pressure &&
                                        <Condition value={weather.pressure} image="/pressure.png" unit="mb"/>}
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>}
        </>
    )
}

export default Weather;
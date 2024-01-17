import {Grid} from "@mui/material";
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
    }else if (skies === 'smoke') {
        image = 'smoke.png';
    }else if (skies === 'fog') {
        image = isDaytime ? 'fog-day.png' : 'fog-night.png';
    } else if (skies === 'partly cloudy') {
        image = isDaytime ? 'partly-cloudy-day.png' : 'partly-cloudy-night.png';
    } else if (skies === 'light snow') {
        image = 'light-snow.png';
    } else if (skies === 'thunderstorm') {
        image = isDaytime ? 'thunderstorm-day.png' : 'thunderstorm-night.png';
    }else if (skies === 'rain') {
        image = isDaytime ? 'rainy-day.png' : 'rainy-night.png';
    }else {
        image = 'unknown-weather.png'
    }
    return `/${image}`;
}

function Weather({weather}) {
    return (
        <>
            {weather &&
                <Grid container direction="column" sx={{padding: '10px', flexWrap: 'nowrap', backgroundColor: '#fff'}}>
                    <Grid item xs={1}>
                        <span className={styles.weatherTitle}>{weather.name} </span>
                    </Grid>
                    <Grid item container justifyContent="center" alignItems="center" xs={4}>
                        <Grid item container direction="column" alignItems="center">
                            <img src={getWeatherIcon(weather)}/>
                            <div className={styles.condition}>{weather.skies}</div>
                        </Grid>
                    </Grid>
                    <Grid item container xs={7} alignItems="start">
                        <Grid item sm={12} md={8} container justifyContent="center">
                            <Grid item container justifyContent="center" alignItems="center" xs={4} md={6}>
                                <Grid item container direction="column" alignItems="center">
                                    <div className={styles.actualTemp}>{Math.round(weather.tempActual)}</div>
                                    <div className={styles.feelsLike}>Feels
                                        like: {Math.round(weather.tempFeelsLike)}</div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent="center" alignItems="center" sm={12} md={4}>
                            <Grid item container direction={{xs: 'row', md: 'column', sm: 'row'}}
                                  sx={{flexWrap: 'nowrap'}}>
                                <Grid item container alignItems="center" justifyContent={{sm: 'center', md: 'start'}}
                                      direction={{xs: 'column', sm: 'row'}}
                                      sx={{paddingTop: '10px'}}>
                                    <Grid item>
                                        <img style={{maxHeight: '1.5em', maxWidth: '1.5em'}} src="/wind.png"/>
                                    </Grid>
                                    <div className={styles.ancillaryValues}>{weather.windSpeed}</div>
                                    <div className={styles.unitNames}>mph</div>
                                </Grid>
                                <Grid item container alignItems="center" justifyContent={{sm: 'center', md: 'start'}}
                                      direction={{xs: 'column', sm: 'row'}}
                                      sx={{paddingTop: '10px'}}>
                                    <Grid item>
                                        <img style={{maxHeight: '1.5em', maxWidth: '1.5em'}} src="/humidity.png"/>
                                    </Grid>
                                    <div className={styles.ancillaryValues}>{weather.humidity}</div>
                                    <div className={styles.unitNames}>%</div>
                                </Grid>
                                <Grid item container alignItems="center" justifyContent={{sm: 'center', md: 'start'}}
                                      direction={{xs: 'column', sm: 'row'}}
                                      sx={{paddingTop: '10px'}}>
                                    <Grid>
                                        <img style={{maxHeight: '1.5em', maxWidth: '1.5em'}} src="/pressure.png"/>
                                    </Grid>
                                    <div className={styles.ancillaryValues}>{weather.pressure}</div>
                                    <div className={styles.unitNames}>mb</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>}
        </>
    )
}

export default Weather;
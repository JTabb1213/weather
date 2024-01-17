import {useEffect, useState} from 'react'
import Weather from "./Weather";
import Map from "./Map";
import Events from "./Events";
import {useLocation, useSearchParams} from "react-router-dom";
import {Alert, AlertTitle, Button, Grid, TextField} from "@mui/material";
import {useHttpClient} from "../HttpClient";
import Progress from "./Progress";
import styles from '../css/cityinfo.module.css';

function CityInfo() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState();
    const [cityInput, setCityInput] = useState();
    const [cityInfo, setCityInfo] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const httpClient = useHttpClient();

    const getCityInfo = async () => {
        setLoading(true);
        httpClient.get(`/api/city-info?city=${city}`).then(result => {
            setCityInfo(result.data);
        }).catch(err => {
            setError(err.response.data);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        const cityFromSearch = searchParams.get("city");
        setCity(cityFromSearch);
        setCityInput(cityFromSearch || "");
    }, [searchParams]);

    useEffect(() => {
        setError(null);
        setCityInfo(null);
        if (city) {

            getCityInfo();
        }
    }, [city]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(params => {
            params.set("city", cityInput);
            return params;
        });
        setCity(cityInput);
    };
    return (
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{paddingBottom: '10px', paddingTop: '20px'}}>
                <Grid item container align="center" spacing={1} justifyContent="center" xs={12}>
                    <Grid item>
                        <TextField
                            sx={{backgroundColor: '#fff'}}
                            variant="outlined"
                            label="City"
                            value={cityInput}
                            onChange={e => setCityInput(e.currentTarget.value)}
                        />
                    </Grid>
                    <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                        <Button fullWidth variant="contained" onClick={handleSearch}>Search</Button>
                    </Grid>
                </Grid>
                {loading && !cityInfo && <Progress title="Fetching city info..." />}
                {error && <Grid container alignItems="center" justifyContent="center" sx={{marginTop: '80px'}}>
                    <Alert severity="error">
                        <AlertTitle>Error Fetching City Info</AlertTitle>
                        {error.message}
                    </Alert>
                </Grid>}

                {cityInfo && <Grid container justifyContent="center" xs={12} sx={{marginTop: '30px'}}>
                    <Grid item xs={12} container>
                        <Events events={cityInfo.events}/>
                    </Grid>
                    <Grid item container className={styles.weatherAndMap}
                          direction="row" xs={11} lg={8} sx={{marginTop: '20px'}}>
                        <Grid item container justifyContent="end"
                              sx={{padding: '0px !important'}} xs={12} sm={12} md={6}>
                            <Weather weather={cityInfo.weather}/>
                        </Grid>
                        <Grid item
                              sx={{padding: '0px !important'}} xs={12} sm={12} md={6}>
                            <Map map={cityInfo.map}/>
                        </Grid>
                    </Grid>
                </Grid>}

            </Grid>
    );
}

export default CityInfo;
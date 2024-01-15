import {useEffect, useState} from 'react'
import Weather from "./Weather";
import Map from "./Map";
import Events from "./Events";
import {useSearchParams} from "react-router-dom";
import {Alert, AlertTitle, Button, Grid, Paper, TextField} from "@mui/material";
import {useHttpClient} from "../HttpClient";
import Progress from "./Progress";


function CityInfo() {
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

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(params => {
            params.set("city", cityInput);
            return params;
        });
        setCity(cityInput);
    };
    return (
        <div id="container">
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                <Grid item container align="center" spacing={1} justifyContent="center">
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

                {cityInfo && <Grid item container spacing={8} justifyContent="center">
                    <Grid item xs={12} container sx={{maxHeight: '425px'}}>
                        <Events events={cityInfo.events}/>
                    </Grid>
                    <Grid item>
                        <Paper elevation={4} sx={{width: '100%'}}>
                            <Grid item container alignItems="center" justifyContent="center" spacing={5} xs={12}>
                                <Grid item container
                                      sx={{padding: '0px !important', minHeight: '400px', minWidth: '400px'}} xs={6}>
                                    <Weather weather={cityInfo.weather}/>
                                </Grid>
                                <Grid item container
                                      sx={{padding: '0px !important', minHeight: '400px', minWidth: '400px'}} xs={6}>
                                    <Map map={cityInfo.map}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>}

            </Grid>


        </div>
    );
}

export default CityInfo;
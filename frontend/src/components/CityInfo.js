import {useEffect, useState} from 'react'
import Weather from "./Weather";
import Map from "./Map";
import Events from "./Events";
import {useSearchParams} from "react-router-dom";
import {Box, Button, Grid, Paper, TextField} from "@mui/material";


function CityInfo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState();
    const [cityInput, setCityInput] = useState();

    useEffect(() => {
        const cityFromSearch = searchParams.get("city");
        setCity(cityFromSearch);
        setCityInput(cityFromSearch || "");
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(params => {
            params.set("city", cityInput);
            return params;
        })
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
                {city && <Grid item container spacing={8} justifyContent="center">
                    <Grid item xs={12} container sx={{maxHeight: '425px'}}>
                        <Events city={city}/>
                    </Grid>
                    <Grid item>
                        <Paper elevation={4} sx={{width: '100%'}}>
                            <Grid item container alignItems="center" justifyContent="center" spacing={5} xs={12}>
                                <Grid item container
                                      sx={{padding: '0px !important', minHeight: '400px', minWidth: '400px'}} xs={6}>
                                    <Weather city={city}/>
                                </Grid>
                                <Grid item container
                                      sx={{padding: '0px !important', minHeight: '400px', minWidth: '400px'}} xs={6}>
                                    <Map city={city}/>
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
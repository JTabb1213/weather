import { useEffect, useState } from "react";
import { useHttpClient } from "../HttpClient";
import Progress from "./Progress";
import {Alert, AlertTitle, Grid} from "@mui/material";

function Map({ city }) {
    const [mapUrl, setMapUrl] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const httpClient = useHttpClient();
    const getMapUrl = async () => {//
        httpClient.get(`/api/map?city=${city}`).then(result => {
            setMapUrl(result.data.mapUrl);
        }).catch(err => {
            setError(err.response.data);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        if (city) {
            setMapUrl(null);
            setError(null);
            setLoading(true);
            getMapUrl();
        }
    }, [city]);
    return (
        <>
            {!loading && mapUrl && <div>
                <img style={{width: '100%', height: '100%'}} src={mapUrl} />
            </div>}
            {loading && !mapUrl && <Progress title="Fetching map..." />}
            {error && <Grid container direction="column" alignItems="center" justifyContent="center">
                <Alert severity="error" sx={{margin: '10px', minHeight: '85px'}}>
                    <AlertTitle>Error Fetching Map</AlertTitle>
                    {error.message}
                </Alert>
            </Grid>}
        </>
    )
}

export default Map;
import {useEffect, useState} from "react";
import {useHttpClient} from "../HttpClient";
import EventCard from "./EventCard";
import {Grid} from "@mui/material";
import styles from '../css/events.module.css';

export default function Events({city}) {
    const [events, setEvents] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const httpClient = useHttpClient();

    const getEvents = async () => {
        setLoading(true);
        httpClient.get(`/api/events?city=${city}`).then(result => {
            setEvents(result.data);
        }).catch(err => {
            setError(err.response.data);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        if (city) {
            setEvents(null);
            setError(null);
            getEvents();
        }
    }, [city]);

    return <>
        {events &&
            <Grid container sx={{overflow: 'scroll'}}>
                <Grid item>
                    {events.length > 0 && <h2 className={styles.eventsSectionTitle}>Upcoming Events</h2>}
                </Grid>
                <Grid item container direction="column">
                    {events.map((event, i) => <Grid item xs={12}><EventCard key={i} event={event}/> </Grid>)}
                </Grid>
            </Grid>
        }


    </>

}
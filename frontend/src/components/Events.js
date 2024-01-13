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
            <Grid container>
                <Grid item>
                    <h2 className={styles.eventsSectionTitle}>Upcoming Events</h2>
                </Grid>
                <Grid item container direction="column" sx={{overflow: 'scroll'}}>
                    {events.length > 0 ?
                        events.map((event, i) => <Grid item xs={12}><EventCard key={i} event={event}/> </Grid>)
                        : <h3 style={{paddingLeft: '40px'}}>There are no events for this location</h3>}
                </Grid>
            </Grid>
        }


    </>

}
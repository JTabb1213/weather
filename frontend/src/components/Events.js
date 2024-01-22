import EventCard from "./EventCard";
import {Alert, AlertTitle, Grid} from "@mui/material";
import styles from '../css/events.module.css';

export default function Events({events}) {
    return <>
        {events &&
            <Grid container>
                <Grid item>
                    <h2 className={styles.eventsSectionTitle}>Upcoming Events</h2>
                </Grid>
                <Grid item container direction="row" sx={{overflow: 'scroll', flexWrap: 'nowrap'}} xs={12}>
                    {events.length > 0 &&
                        events.map((event, i) => <Grid item><EventCard key={i} event={event}/> </Grid>)}
                    {events.error &&
                        <Grid item container justifyContent="center">
                        <Alert severity="error">
                            <AlertTitle>Error Fetching City Info</AlertTitle>
                            {events.error.message}
                        </Alert>
                        </Grid>}
                    {!events.error && events.length === 0 && <h3 style={{paddingLeft: '40px'}}>There are no events for this location</h3>}
                </Grid>
            </Grid>
        }
    </>

}
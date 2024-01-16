import EventCard from "./EventCard";
import {Grid} from "@mui/material";
import styles from '../css/events.module.css';

export default function Events({events}) {
    return <>
        {events &&
            <Grid container>
                <Grid item>
                    <h2 className={styles.eventsSectionTitle}>Upcoming Events</h2>
                </Grid>
                <Grid item container direction="row" sx={{overflow: 'scroll', flexWrap: 'nowrap', minHeight: {xs: '200px'}}} xs={12}>
                    {events.length > 0 ?
                        events.map((event, i) => <Grid item xs={12} sx={{height: '100%', minWidth: '300px'}}><EventCard key={i} event={event}/> </Grid>)
                        : <h3 style={{paddingLeft: '40px'}}>There are no events for this location</h3>}
                </Grid>
            </Grid>
        }
    </>

}
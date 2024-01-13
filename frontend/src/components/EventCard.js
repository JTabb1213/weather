import {Container, Grid} from "@mui/material";
import {useEffect} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styles from '../css/events.module.css';

export default function EventCard({event}) {
    useEffect(() => {

    }, []);

    const findImage = (event) => {
        return event.images.find(image => {
            return image.ratio === '3_2' && image.width > 300 && image.width < 400;
        }).url
    }

    return <Card raised={true} className={styles.eventCard} variant="outlined" sx={{margin: '10px', width: '350px'}}>
        <CardContent sx={{padding: '0px'}} className={styles.eventCardContent}>
            <Grid container sx={{padding: '0px'}} xs={12}>
                <Grid item xs={12} sx={{maxHeight: '80%'}}>
                    <img src={findImage(event)} style={{width: '100%'}}/>
                </Grid>
                <Grid container xs={12} sx={{paddingTop: '15px', paddingLeft: '20px'}} spacing={1}>
                    <Grid container xs={12} spacing={1}>
                        <Grid item xs={4}>
                            <div className={styles.eventCardGenre}>{event.classifications[0].genre.name}</div>
                        </Grid>
                        <Grid item xs={8} justifyContent="end" container>
                            <Grid item ><div className={styles.eventCardGenre}>{event.date}</div></Grid>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} sx={{paddingTop: '5px'}}>
                        <div className={styles.eventCardTitle}>{event.name}</div>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}
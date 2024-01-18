import Card from "@mui/material/Card";
import styles from "../css/events.module.css";
import CardContent from "@mui/material/CardContent";
import {Box, Grid, Rating} from "@mui/material";

//sx={{height: '100%', minWidth: '300px'}}

export default function ReviewCard({item}) {
    return <Card raised={true} className={styles.eventCard} variant="outlined" sx={{margin: '10px', width: {xs: '250px', sm: '300px'}, maxHeight: {sm: '300px', xs: '275px'}}}>
        <CardContent sx={{padding: '0px'}} className={styles.eventCardContent}>
            <Grid container sx={{padding: '0px'}} xs={12}>
                <Grid item xs={12}>
                    <Box component="img" src={item.imageUrl} sx={{width: '100%', height: {sm: '200px', xs: '175px'}}}/>
                </Grid>
                <Grid container xs={12} sx={{paddingTop: '15px', paddingLeft: '20px'}} spacing={1}>
                    <Grid container xs={12}>
                        <Grid item xs={8}>
                            <div style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', textWrap:'nowrap', overflow: 'hidden'}} className={styles.eventCardGenre}>{item.categories[0]}</div>
                        </Grid>
                        <Grid item xs={4} justifyContent="end" container>
                            <Rating
                                precision={0.5} size="small"
                                value={item.rating}
                            />
                        </Grid>
                    </Grid>

                    <Grid container xs={12} sx={{paddingTop: '5px'}}>
                        <Grid item xs={9} container alignItems="center" >
                            <div style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', textWrap:'nowrap', overflow: 'hidden'}}  className={styles.eventCardTitle}>{item.name}</div>
                        </Grid>
                        <Grid item xs={3} container alignItems="center" justifyContent="end">
                            <div style={{paddingRight: '2px'}}className={styles.eventCardGenre}>{item.price}</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}
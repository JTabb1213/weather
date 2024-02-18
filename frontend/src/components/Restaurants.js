import { Alert, AlertTitle, Grid } from "@mui/material";
import styles from '../css/food.module.css';
import ReviewCard from "./ReviewCard";

export default function Restaurants({ items }) {
    console.log("items:", items);
    return <>
        {items &&
            <Grid container>
                <Grid item>
                    <h2 className={styles.foodSectionTitle}>Restaurants</h2>
                </Grid>
                <Grid item container direction="row" sx={{ overflow: 'scroll', flexWrap: 'nowrap' }} xs={12}>
                    {items.length > 0 &&
                        items.map((item, i) => <Grid item><ReviewCard key={i} item={item} /> </Grid>)}
                    {items.error &&
                        <Grid item container justifyContent="center">
                            <Alert severity="error">
                                <AlertTitle>Error Fetching City Info</AlertTitle>
                                {items.error.message}
                            </Alert>
                        </Grid>}
                    {!items.error && items.length === 0 && <h3 style={{ paddingLeft: '40px' }}>There are no restaurants for this location</h3>}
                </Grid>
            </Grid>
        }
    </>

}
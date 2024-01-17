import {Grid} from "@mui/material";
import styles from '../css/food.module.css';
import ReviewCard from "./ReviewCard";

export default function Restaurants({items}) {
    return <>
        {items &&
            <Grid container>
                <Grid item>
                    <h2 className={styles.foodSectionTitle}>Restaurants</h2>
                </Grid>
                <Grid item container direction="row" sx={{overflow: 'scroll', flexWrap: 'nowrap'}} xs={12}>
                    {items.length > 0 ?
                        items.map((item, i) => <Grid item sx={{height: '100%', minWidth: '300px'}}><ReviewCard key={i} item={item}/> </Grid>)
                        : <h3 style={{paddingLeft: '40px'}}>There are no restaurants for this location</h3>}
                </Grid>
            </Grid>
        }
    </>

}
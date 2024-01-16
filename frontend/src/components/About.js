import {Grid} from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";

export default function About() {
    return <Grid container direction="column" alignItems="center" justifyContent="center">
        <h5 className={styles.sectionTitle}>About</h5>
        <h1 className={styles.sectionIntro}>Let me introduce myself.</h1>
        <Grid item container justifyContent="center" alignContent="center">
            <Grid item container xs={12} sm={12} md={8} justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={2} md={2} container alignItems="center" justifyContent="center">
                    <img style={{maxHeight: '10rem', maxWidth: '10rem', height: '100%', width: '100%', borderRadius: '50%'}} src="/headshot.png"/>
                </Grid>
                <Grid item xs={12} sm={5} md={5} container alignItems="center" justifyContent={{xs: 'center', sm: 'center', md: 'start'}}>
                    <div className={aboutStyles.profileDescription}>I'm a computer science student at NIU.</div>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}
import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";

export default function AboutSection() {
    return (
        <Grid className={styles.section} container direction="column" alignItems="center" justifyContent="start" >
            <h1 className={styles.sectionIntro}>Let me introduce myself.</h1>
            <Grid item container xs={12} sm={12} md={6} lg={5} xl={4} paddingLeft={30} justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={2} md={2} container alignItems="center" justifyContent={{ xs: 'center', sm: 'end' }}>
                    <Box component="img" sx={{ height: 'auto', width: '66%', borderRadius: '50%' }} src="/headshot.png" />
                </Grid>
                <Grid item xs={12} sm={7} md={9} container alignItems="center" sx={{ paddingLeft: { xs: '10px !important' } }} justifyContent={{ xs: 'center', sm: 'start', md: 'start' }}>
                    <div className={aboutStyles.profileDescription}>I'm a computer science student at NIU.</div>
                </Grid>
            </Grid>
        </Grid>
    )
}
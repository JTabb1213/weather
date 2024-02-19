import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";

export default function AboutSection() {
    return (
        <Grid>
            <Grid item xs={12} sm={12} justifyContent="center">
                <h1  >Let me introduce myself.</h1>
            </Grid>
            <Grid item container xs={12} spacing={2} justifyContent="center">
                <Grid item xs={4} sm={4} justifyContent="center">
                    <Box component="img" sx={{ height: 'auto', width: '100%', borderRadius: '50%' }} src="/headshot.png" />
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={12} sm={8} >
                    <div className={aboutStyles.profileDescription}>I'm a computer science student at NIU.</div>
                </Grid>
            </Grid>
        </Grid>

    );
}


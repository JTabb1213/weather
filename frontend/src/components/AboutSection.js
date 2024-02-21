import {Box, Grid} from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";

export default function AboutSection() {
    return (
        <Grid item direction="column" alignItems="center" justifyContent="center" className={styles.section} sx={{paddingBottom: '100px', backgroundColor: '#000'}}>
            <h5 className={styles.sectionTitle}>About</h5>
            <h1 className={styles.sectionIntro} style={{color: '#fff'}}>Let me introduce myself.</h1>
            <Grid item container xs={12} spacing={4} justifyContent="center" alignItems="center">
                <Grid item container xs={12} sm={2} md={2} justifyContent={{md: "end", xs: "center"}}>
                    <Box component="img" className={aboutStyles.headshot} src="/headshot.png"/>
                </Grid>
                <Grid item container xs={12} md={6} sm={12} justifyContent="center" sx={{margin: '0px 30px'}}>
                    <div style={{color: '#888888'}} className={aboutStyles.profileDescription}>I am a current college student pursuing a bachelor’s
                        in computer science seeking an internship opportunity to apply my knowledge learned to real
                        world projects while gaining hands on experience in programming, software engineering, and
                        collaborating within a team environment. Looking forward to make any possible contributions and
                        learn from experienced professionals in the field of computer science.
                    </div>
                </Grid>
            </Grid>

        </Grid>

    );
}


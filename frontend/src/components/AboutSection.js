import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";

export default function AboutSection() {
    return (
        <Grid item direction="column" alignItems="center" justifyContent="center" className={styles.section}
            sx={{ paddingBottom: '100px', backgroundColor: '#000' }}>
            <h5 className={styles.sectionTitle}>About</h5>
            <h1 className={styles.sectionIntro} style={{ color: '#fff' }}>Let me introduce myself.</h1>
            <Grid item container xs={12} spacing={{ sm: 4, xs: 4, md: 0 }} justifyContent="center" alignItems="center" sx={{ paddingTop: '15px' }}>
                <Grid item container xs={12} sm={2} md={2} justifyContent={{ md: "end", xs: "center" }}>
                    <Box component="img" className={aboutStyles.headshot} src="/headshot.png" />
                </Grid>
                <Grid item container xs={12} md={6} sm={12} justifyContent="center" sx={{ margin: '0px 30px' }}>
                    <Box component="div" className={aboutStyles.profileDescription} sx={{ textAlign: { sm: "center", xs: "center", md: "left" } }}>I am a recent graduate in Computer Science from Northern Illinois University. I enjoy learning new technologies, frameworks, and
                        languages. My career interests include software development, software architecture, and cybersecurity.</Box>
                </Grid>
            </Grid>

        </Grid>

    );
}


import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";

export default function AboutSection() {
    return (
        <Grid className={aboutStyles.aboutGrid}>
            <Grid item xs={12} sm={12} md={12} lg={12} container justifyContent="center">
                <h1>Let me introduce myself.</h1>
            </Grid>
            <Grid item container xs={12} spacing={2} justifyContent="center">
                <Grid item xs={3} sm={3} md={2} lg={2} justifyContent="center">
                    <Box component="img" sx={{ height: 'auto', width: '100%', borderRadius: '50%' }} src="/headshot.png" />
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={12} sm={8} >
                    <div className={aboutStyles.profileDescription} styles={{ wordBreak: 'break-all' }}>
                        I'm a computer science student at NIU in my junior year. When outside of school,
                        I like to learn new technologies and apply what I have learned by working on personal projects.
                        This not only helps me grasp concepts better but also allows me to stay
                        updated with the latest industry trends. In my free time, I like to explore the outdoors and
                        spend time with family and friends. I'm passionate about technology and
                        always eager to expand my skills and knowledge.
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}


import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";
import ResumeButton from "./Resume";
import SkillsButton from "./SkillsButton";
import AboutButton from "./AboutButton";

export default function About() {
    return <Grid className={styles.section} container direction="column" alignItems="center" justifyContent="start">
        <div className={styles.resumeButtonContainer}>
            <Grid item xs={12} sm={4}>
                <SkillsButton />
            </Grid>
            <Grid item xs={12} sm={4}>
                <AboutButton />
            </Grid>
            <Grid item xs={12} sm={4}>
                <ResumeButton />
            </Grid>
        </div>
    </Grid>
}
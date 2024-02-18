import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";
import ResumeButton from "./Resume";
import SkillsButton from "./SkillsButton";
import AboutButton from "./AboutButton";

export default function About() {
    return <Grid className={styles.section} container direction="column" alignItems="center" justifyContent="start">
        <div className={styles.resumeButtonContainer}>
            <SkillsButton></SkillsButton>
            <AboutButton />
            <ResumeButton></ResumeButton>
        </div>
    </Grid>
}
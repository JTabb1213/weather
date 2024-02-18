import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import aboutStyles from "../css/about.module.css";
import ResumeButton from "./Resume";

export default function SkillsButton() {
    return (
        <a href="#aboutSection" className={styles.resumeButton} style={{ textDecoration: 'none' }}>
            About
        </a>
    );
}

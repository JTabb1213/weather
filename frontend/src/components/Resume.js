import React, { useState } from 'react';
import { Box, Grid } from "@mui/material";
import styles from "../css/app.module.css";
import resume from '../resume/my-resume.pdf';


export default function ResumeButton() {
    const openResume = () => {
        const newTab = window.open(resume, '_blank');
        if (newTab) {
            newTab.opener = null;//opens a new tab every time
        }
    };

    return (
        <a href className={styles.resumeButton} style={{ textDecoration: 'none' }} onClick={openResume}>
            Resume
        </a>
    );
}
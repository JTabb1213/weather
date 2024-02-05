import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import About from "../components/About";
import Projects from "../components/Projects";
import { Grid } from "@mui/material";
import ResumeButton from "../components/Resume";
import Skills from "../components/Skills";

export default function Home() {
    return <Grid direction="column" container sx={{ flexWrap: 'nowrap', height: '100%' }}>
        <Grid item container>
            <About />
        </Grid>
        <Grid item container sx={{ flexGrow: 1 }}>
            <Projects />
        </Grid>
        <Grid item container id="skillsSection">
            <Skills></Skills>
        </Grid>
    </Grid>
}

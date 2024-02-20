import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import About from "../components/About";
import Projects from "../components/Projects";
import { Grid } from "@mui/material";
import ResumeButton from "../components/Resume";
import Skills from "../components/Skills";
import AboutSection from "../components/AboutSection";

export default function Home() {
    return <Grid direction="column" container sx={{ flexWrap: 'nowrap', height: '100%' }}>
        <Grid item container sx={{ flexGrow: 1 }}>
            <Projects />
        </Grid>
        <Grid item container id="skillsSection" sx={{ marginTop: 20 }} >
            <div style={{ marginBottom: 50 }}>
                <Skills />
            </div>
        </Grid>
        <Grid item container id="aboutSection"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0'
            }}
        >
            <div style={{ marginBottom: 5000 }}>
                <AboutSection />
            </div>
        </Grid>
    </Grid>
}

import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import About from "../components/About";
import Projects from "../components/Projects";
import {Grid} from "@mui/material";


export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    return <Grid direction="column" container sx={{height: '100%'}}>
        <Grid item container xs={4}>
            <About/>
        </Grid>
        <Grid item container xs={8}>
            <Projects/>
        </Grid>
    </Grid>
}

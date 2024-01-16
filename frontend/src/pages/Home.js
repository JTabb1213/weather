import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import About from "../components/About";
import Projects from "../components/Projects";
import {Grid} from "@mui/material";


export default function Home() {
    return <Grid direction="column" container sx={{height: '100%', flexWrap: 'nowrap'}}>
        <Grid item container xs={4}>
            <About/>
        </Grid>
        <Grid item container xs={8}>
            <Projects/>
        </Grid>
    </Grid>
}

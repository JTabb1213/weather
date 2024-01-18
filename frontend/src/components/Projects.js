import styles from "../css/app.module.css";
import { Button, CardActions, CardMedia, Grid, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

function ProjectCard() {
    const navigate = useNavigate();
    return <Card sx={{ maxWidth: 345 }}>

        <CardContent>
            <Grid container direction="column">
                <Grid container justifyContent="center">
                    <img src="/cityinfo-app.png" />
                </Grid>
                <Typography gutterBottom variant="h5" component="div">
                    City Info
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Search for a city to get a map, current weather, and upcoming events
                </Typography>
            </Grid>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={() => { window.open('https://github.com/JTabb1213/weather') }}>Github</Button>
            <Button size="small" onClick={() => { navigate('/apps/cityinfo') }}>Go to app</Button>
        </CardActions>
    </Card>
}

export default function Projects() {
    return <Grid container direction="column"
        className={styles.section}
        sx={{ backgroundColor: '#ebeeee' }}>
        <Grid container item direction="column" alignItems="center" justifyContent="center">
            <h5 className={styles.sectionTitle}>Projects</h5>
            <h1 className={styles.sectionIntro}>Check out my creations.</h1>
            <Grid item container justifyContent="center">
                <ProjectCard />
            </Grid>
        </Grid>
    </Grid>
}
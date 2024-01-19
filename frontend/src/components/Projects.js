import styles from "../css/app.module.css";
import {Box, Button, CardActions, CardMedia, Grid, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";
function ProjectCard({title, desc, links, image}) {
    const navigate = useNavigate();
    const handleLinkClicked = (link) => {
        if (link.url) {
            window.open(link.url)
        } else {
            navigate(link.route)
        }
    }
    return <Card sx={{width: {xs: '200px', sm: '250px'}}}>
        <CardContent>
            <Grid container direction="column">
                <Grid container justifyContent="center">
                    <Box component="img" sx={{height: {xs: '5em'}}} src={image}/>
                </Grid>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {desc}
                </Typography>
            </Grid>
        </CardContent>
        <CardActions>
            {links && links.filter(link => {
                return link.url || link.route
            }).map(link => {
                return <Button size="small" onClick={() => handleLinkClicked(link)}>{link.label}</Button>
            })}
        </CardActions>
    </Card>
}

export default function Projects() {
    return <Grid container direction="column"
                 className={styles.section}
                 sx={{backgroundColor: '#ebeeee'}}>
        <Grid container item direction="column" alignItems="center" justifyContent="center">
            <h5 className={styles.sectionTitle}>Projects</h5>
            <h1 className={styles.sectionIntro}>Check out my creations.</h1>
            <Grid item container sx={{padding: {md: '10px'}}} justifyContent="center">
                <ProjectCard title="CityInfo"
                             desc="Search for a city to get a map, current weather, and upcoming events"
                             links={[{
                                 label: 'Github',
                                 url: 'https://github.com/JTabb1213/weather'
                             }, {
                                 label: 'Go to app',
                                 route: '/apps/cityinfo',
                                 app: 'CityInfo'
                             }]}
                             image="/cityinfo-app.png"/>

            </Grid>
        </Grid>
    </Grid>
}
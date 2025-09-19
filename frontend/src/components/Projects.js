import styles from "../css/app.module.css";
import { Box, Button, CardActions, Grid, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

function ProjectCard({ title, desc, links, image }) {
    const navigate = useNavigate();
    const handleLinkClicked = (link) => {
        if (link.url) {
            window.open(link.url)
        } else {
            navigate(link.route)
        }
    }
    return <Card elevation={10} sx={{ width: { xs: '200px', sm: '250px' }, height: '260px', }}>
        <CardContent>
            <Grid container direction="column">
                <Grid container justifyContent="center">
                    <Box component="img" sx={{ height: { xs: '5em' } }} src={image} />
                </Grid>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ height: '50px' }} variant="body2" color="text.secondary">
                    {desc}
                </Typography>
            </Grid>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: "center", allignItems: 'center' }}>
            {links && links.filter(link => {
                return link.url || link.route
            }).map(link => {
                return <Button size="small" onClick={() => handleLinkClicked(link)}>{link.label}</Button>
            })}
        </CardActions>
    </Card>
}

export default function Projects() {
    return <Grid container item direction="row" alignItems="center" justifyContent="center"
        sx={{ backgroundColor: '#fff' }} className={styles.section}>
        <Grid item>
            <h5 className={styles.sectionTitle}>Projects</h5>
            <h1 className={styles.sectionIntro}>Check out my creations.</h1>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" columnSpacing={5}>
            <Grid item sx={{ paddingTop: '30px' }}>
                <ProjectCard
                    title="CityInfo"
                    desc="Search for a city to get a map, current weather, and upcoming events"
                    links={[{
                        label: 'Github',
                        url: 'https://github.com/JTabb1213/weather'
                    }, {
                        label: 'Go to app',
                        route: '/apps/cityinfo',
                        app: 'CityInfo'
                    }]}
                    image="/cityinfo-app.png" />
            </Grid>
            <Grid item>
                <div className={`${styles.ribbon}`}><span>In progress</span></div>
                <ProjectCard
                    title="RestaurantReviewer"
                    desc="Allows a user to review a restaurant using a GPS location"
                    links={[{
                        label: 'Go to app',
                        url: 'https://my-deploy-12345.uc.r.appspot.com'
                    }]}
                    image="/restaurant.png">
                </ProjectCard>

            </Grid>

        </Grid>

    </Grid>
}
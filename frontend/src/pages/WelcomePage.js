import { Alert, Box, Button, CircularProgress, Container, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from '../css/login.module.css';
import { useHttpClient } from "../HttpClient";
import { redirect, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { green, red } from '@mui/material/colors';


export default function WelcomePage() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState();
    const [working, setWorking] = useState();
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');
    const onLoginClick = () => {
        navigate({
            pathname: '/login',
            search: redirectUrl ? `?redirect_url=${location.pathname}${location.search}` : ''
        });
    }

    const onRegisterClicked = () => {
        navigate({
            pathname: '/register',
            search: redirectUrl ? `?redirect_url=${location.pathname}${location.search}` : ''
        });
    }


    return <div>
        <Container sx={{ width: { xs: "90%", sm: '60%', md: '60%', lg: '50%', xl: '35%' }, marginTop: '200px' }}>
            <Paper elevation={5} sx={{ padding: '40px' }}>
                <Grid container
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}>

                    <Grid item align="center"
                        xs={12}>
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <img src="/lock.png" />
                            {working && (
                                <CircularProgress
                                    size={50}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-26px',
                                        marginLeft: '-25px',
                                        zIndex: 1,
                                    }}
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" onClick={onLoginClick}>Login</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" onClick={onRegisterClicked}>Sign up for account</Button>
                    </Grid>

                </Grid>

            </Paper>
        </Container>

    </div >

}

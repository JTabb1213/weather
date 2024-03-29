import {Alert, Box, Button, CircularProgress, Container, Grid, Paper, TextField} from "@mui/material";
import {useState} from "react";
import styles from '../css/login.module.css';
import {useHttpClient} from "../HttpClient";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {green} from '@mui/material/colors';

export default function Login() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState();
    const [working, setWorking] = useState();
    const redirectUrl = searchParams.get('redirect_url');
    const onButtonClick = () => {
        setError(null);
        setWorking(true);
        httpClient.post('/api/auth/login', {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            navigate(redirectUrl || '/home');
        }).catch(err => {
            setError(err.response.data.message);
        }).finally(() => {
            setWorking(false);
        })
    }

    const onRegisterClicked = () => {
        navigate({
            pathname: '/register',
            search: redirectUrl ? `?redirect_url=${location.pathname}${location.search}` : ''
        });
    }

    const onForgotPassword = () => {
        navigate({
            pathname: '/forgotPassword',
            search: redirectUrl ? `?redirect_url=${location.pathname}${location.search}` : ''
        });
    }

    return <div>
        <Container sx={{ width: { xs: "90%", sm: '60%', md: '60%', lg: '50%', xl: '35%' }, marginTop: { xs: '20px', sm: '20px', md: '150px' } }}>
            <Paper elevation={5} sx={{ padding: {xs: '10px', sm: '10px', md: '30px'} }}>
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
                    <Grid item xs={12} align="center">
                        <div className={styles.title}>Sign in</div>
                    </Grid>

                    {error && <Grid item xs={12}>
                        <Alert severity="error">{error}</Alert>
                    </Grid>}

                    <Grid item xs={12}>
                        <TextField fullWidth defaultValue={username}
                            InputProps={{ sx: { fontSize: "1.6vh", height: {xs: "2.5rem"} } }}
                            InputLabelProps={{ sx: { fontSize: {xs: "1.6vh"}, top: "-0.5vh", "&.MuiInputLabel-shrink": { top: 0 }} }}
                            onChange={ev => setUsername(ev.target.value)}
                            label="Username" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth defaultValue={password}
                            InputProps={{ sx: { fontSize: "1.6vh", height: {xs: "2.5rem"} } }}
                            InputLabelProps={{ sx: { fontSize: {xs: "1.6vh"} , top: "-0.5vh", "&.MuiInputLabel-shrink": { top: 0 }} }}
                            type="password"
                            onChange={ev => setPassword(ev.target.value)}
                            label="Password" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" onClick={onButtonClick}>SIGN IN</Button>
                    </Grid>
                    <Grid container item xs={12} direction="row" spacing={1}>
                        <Grid item xs={12} md={6} container justifyContent="start">
                            <a onClick={onForgotPassword}>Forgot password?</a>
                        </Grid>
                        <Grid item container xs={12} md={6} justifyContent={{ lg: 'end', md: 'end', sm: 'start', xs: 'start' }}>
                            <a onClick={onRegisterClicked} sx={{ textWrap: 'nowrap' }}>Don't have an account? Sign Up</a>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </Container>

    </div>


}
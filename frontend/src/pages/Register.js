import {useHttpClient} from "../HttpClient";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {Alert, Box, Button, CircularProgress, Container, Grid, Paper, TextField} from "@mui/material";
import {green} from "@mui/material/colors";
import styles from "../css/login.module.css";

export default function Register() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState();
    const [working, setWorking] = useState();
    const redirectUrl = searchParams.get('redirect_url');
    const onSignUp = () => {
        if (!username || !password) {
            setError("Username and password are required");
            return;
        }
        httpClient.post('/api/users', {
            username: username,
            password: password
        },).then(result => {
            navigate(redirectUrl || '/');
        }).catch(err => {
            console.log(error);
            setError(err.response?.data?.message || "an error occured");
        });
    }

    const onSigninClicked = () => {
        navigate(redirectUrl || '/login');
    }

    return <div>
        <Container sx={{
            width: {xs: "90%", sm: '60%', md: '60%', lg: '50%', xl: '35%'},
            marginTop: {xs: '20px', sm: '20px', md: '150px'}
        }}>
            <Paper elevation={5} sx={{padding: '40px'}}>
                <Grid container
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}>

                    <Grid item align="center"
                          xs={12}>
                        <Box sx={{m: 1, position: 'relative'}}>
                            <img src="/register.png"/>
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
                        <div className={styles.title}>New Account</div>
                        <div className={styles.subtitle}>Create an account to access city information to get maps, weather, and upcoming events</div>
                    </Grid>

                    {error && <Grid item xs={12}>
                        <Alert severity="error">{error}</Alert>
                    </Grid>}
                    <Grid item xs={12}>
                        <TextField fullWidth defaultValue={username}
                                   InputProps={{sx: {fontSize: "1.6vh", height: {xs: "2.5rem"}}}}
                                   InputLabelProps={{
                                       sx: {
                                           fontSize: {xs: "1.6vh"},
                                           top: "-0.5vh",
                                           "&.MuiInputLabel-shrink": {top: 0}
                                       }
                                   }}
                                   onChange={ev => setUsername(ev.target.value)}
                                   label="Username" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth defaultValue={password}
                                   InputProps={{sx: {fontSize: "1.6vh", height: {xs: "2.5rem"}}}}
                                   InputLabelProps={{
                                       sx: {
                                           fontSize: {xs: "1.6vh"},
                                           top: "-0.5vh",
                                           "&.MuiInputLabel-shrink": {top: 0}
                                       }
                                   }}
                                   type="password"
                                   onChange={ev => setPassword(ev.target.value)}
                                   label="Password" variant="outlined"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" onClick={onSignUp}>SIGN UP</Button>
                    </Grid>
                    <Grid container item xs={12} direction="row" spacing={1} justifyContent="start">
                        <Grid item>
                            <a onClick={onSigninClicked}>Already have an account? Sign In</a>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>

    </div>
}
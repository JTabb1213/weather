import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Login from "./pages/Login";
import {BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useHttpClient} from "./HttpClient";
import Register from "./pages/Register";
import {HashLink as Link} from 'react-router-hash-link';
import ForgotPassword from "./pages/ForgotPassword";
import City from "./pages/City";
import styles from './css/app.module.css';

function AppLayout({config}) {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');

    const handleLogout = () => {
        httpClient.post('/api/auth/logout', {}, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            navigate({
                pathname: '/',
                search: redirectUrl ? `?redirect_url=${location.pathname}${location.search}` : ''
            });
        }).catch(err => {
            console.error("logout failed", err)
        })
    }

    return <Box sx={{
        paddingTop: {xs: '54px', sm: '54px', md: '64px'},
        height: {xs: 'calc(100vh - 54px)', sm: 'calc(100vh - 54px)', md: 'calc(100vh - 64px)'}
    }}>
        <AppBar component="nav" position="fixed"
                sx={{
                    width: '100%',
                }}>
            <Toolbar sx={{paddingLeft: {xs: '2px !important', sm: '24px !important'}}}>
                <IconButton
                    color="inherit"
                >

                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1}}
                >
                    Jack Tabb
                </Typography>
                <Box className={styles.menuLinks}>
                    <Link to='/home' className={styles.menuLink}>Home</Link>
                    <Link to='/home#projects' className={styles.menuLink}>Projects</Link>
                    {/*<Button sx={{ color: '#fff' }}>*/}
                    {/*    Projects*/}
                    {/*</Button>*/}
                    {config.logout && <Button onClick={handleLogout} sx={{color: '#fff'}}>
                        Logout
                    </Button>}
                </Box>
            </Toolbar>
        </AppBar>
        <div className="content" style={{height: '100%'}}>
            <Outlet/>
        </div>

    </Box>
}


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout config={{}}/>}>
                    <Route path="home" element={<Home/>}/>
                    <Route index element={<Home/>}/>
                    <Route path="apps" element={<City/>}/>
                </Route>
                <Route path="apps" element={<AppLayout config={{logout: true}}/>}>
                    <Route path="cityinfo" element={<City/>}/>
                </Route>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="forgotPassword" element={<ForgotPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);



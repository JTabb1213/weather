import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {styled, useTheme} from '@mui/material/styles';
import Home from "./pages/Home";
import Login from "./pages/Login";
import {BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    Divider,
    Hidden,
    IconButton, List, ListItem,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@mui/material";
import {useHttpClient} from "./HttpClient";
import Register from "./pages/Register";
import {HashLink as Link} from 'react-router-hash-link';
import ForgotPassword from "./pages/ForgotPassword";
import City from "./pages/City";
import styles from './css/app.module.css';
import ReactGA from 'react-ga';
//import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import MenuIcon from '@mui/icons-material/Menu';

const links = [{
    label: 'Home',
    path: '/home'
}, {
    label: 'Projects',
    path: '/home#projects'
}]

function AppLayout({config}) {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');
    const [menuOpen, setMenuOpen] = useState();
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

    const allLinks = links.concat(config.logout ? [{
        label: 'Logout',
        handler: handleLogout
    }] : []);

    const drawerStyles = {
        '&, & .MuiDrawer-paper': {
            backgroundColor: '#1976d2',
            color: '#fff',
            width: '65%'
        },
    };

    return <Box sx={{height: {md: 'calc(100vh - 64px)', xs: 'calc(100vh - 54px)', sm: 'calc(100vh - 54px)'}}}>
        <AppBar component="nav" position="sticky"
                sx={{
                    width: '100%',
                }}>
            <Toolbar sx={{paddingLeft: {xs: '2px !important', sm: '24px !important'}}}>
                <Hidden smUp>
                <IconButton
                    onClick={() => {
                        setMenuOpen(true)
                    }}
                    color="inherit">
                    <MenuIcon/>
                </IconButton>
                </Hidden>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Jack Tabb</Typography>
                <Hidden smDown>
                <Box className={styles.menuLinks}>
                    {allLinks.map(link => {
                        return link.handler ? <Button onClick={link.handler} sx={{color: '#fff'}}>{link.label}</Button>
                            : <Link to={link.path}
                                    className={styles.menuLink}>{link.label}</Link>
                    })}
                </Box>
                </Hidden>
            </Toolbar>
        </AppBar>
        <SwipeableDrawer
            sx={drawerStyles}
            anchor='left'
            open={menuOpen}
            onClose={() => setMenuOpen(!menuOpen)}
        >
            <Divider/>
            <List>
                {allLinks && allLinks.map(link => {
                    return <ListItem key={link.path}>{link.handler ?
                         <Button onClick={() => setMenuOpen(!menuOpen) && link.handler}
                                 sx={{color: '#fff'}}>{link.label}</Button> :
                         <Link onClick={() => setMenuOpen(!menuOpen)} to={link.path}
                               className={styles.menuLink}>{link.label}</Link>}
                    </ListItem>
                })}
            </List>
        </SwipeableDrawer>
        <div className="content" style={{height: '100%'}}>
            <Outlet/>
        </div>

    </Box>
}


export default function App() {
    const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
    if (gaTrackingId) {
        ReactGA.initialize(gaTrackingId);
    }
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

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



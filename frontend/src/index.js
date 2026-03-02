import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, responsiveFontSizes, ThemeProvider, useTheme } from '@mui/material/styles';
import Login from "./pages/Login";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
    AppBar,
    Box,
    Button, CssBaseline,
    Divider,
    Hidden,
    IconButton, List, ListItem,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@mui/material";
import { useHttpClient } from "./HttpClient";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import City from "./pages/City";
import styles from './css/app.module.css';
// import ReactGA from 'react-ga4';
import AppContext from './AppContext';
import MenuIcon from '@mui/icons-material/Menu';

const links = [{
    label: 'City Info',
    path: '/'
}]

function AppLayout({ config }) {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');
    const [menuOpen, setMenuOpen] = useState(false);
    const drawerWidth = 240;

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
        '& .MuiDrawer-paper': {
            backgroundColor: '#1976d2',
            color: '#fff',
            width: `${drawerWidth}px`
        },
    };

    const mainStyles = {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(menuOpen && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: `${drawerWidth}px`,
        }),
        height: { md: 'calc(100vh - 64px)', xs: 'calc(100vh - 54px)', sm: 'calc(100vh - 54px)' }
    }

    let siteTheme = createTheme({
        palette: {
            mode: "light",
        },
    });
    siteTheme = responsiveFontSizes(siteTheme);


    return <AppContext.Provider value={{}}>
        <ThemeProvider theme={siteTheme}>
            <CssBaseline>
                <Box sx={mainStyles}>
                    <AppBar component="nav" position="sticky"
                        sx={{
                            width: '100%',
                        }}>
                        <Toolbar sx={{ paddingLeft: { xs: '2px !important', sm: '24px !important' } }}>
                            <Hidden smUp>
                                <IconButton
                                    onClick={() => {
                                        setMenuOpen(true)
                                    }}
                                    color="inherit">
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>City Info</Typography>
                            <Hidden smDown>
                                <Box className={styles.menuLinks}>
                                    {allLinks.map(link => {
                                        return link.handler ?
                                            <Button key={link.label} onClick={link.handler} sx={{ color: '#fff' }}>{link.label}</Button>
                                            : <Link key={link.label} to={link.path}
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
                        onOpen={() => setMenuOpen(true)}
                        onClose={() => setMenuOpen(false)}
                    >
                        <Divider />
                        <List>
                            {allLinks && allLinks.map(link => {
                                return <ListItem key={link.label}>{link.handler ?
                                    <Button onClick={() => {
                                        setMenuOpen(false);
                                        link.handler.apply()
                                    }}
                                        sx={{ color: '#fff' }}>{link.label}</Button> :
                                    <Link onClick={() => setMenuOpen(false)} to={link.path}
                                        className={styles.menuLink}>{link.label}</Link>}
                                </ListItem>
                            })}
                        </List>
                    </SwipeableDrawer>
                    <Box className="content" style={{ height: '100%' }}>
                        <Outlet />
                    </Box>
                </Box>

            </CssBaseline>
        </ThemeProvider>
    </AppContext.Provider>
}

// const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
// if (gaTrackingId) {
//     ReactGA.initialize(gaTrackingId);
// }

export default function App() {
    // useEffect(() => {
    //     ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout config={{ logout: true }} />}>
                    <Route index element={<City />} />
                    <Route path="cityinfo" element={<City />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);



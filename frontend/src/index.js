import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Login from "./pages/Login";
//import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { BrowserRouter, Outlet, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useHttpClient } from "./HttpClient";
import Register from "./pages/Register";
import WelcomePage from "./pages/WelcomePage";
import ForgotPassword from "./pages/ForgotPassword";

function AppLayout() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');

    const handleLogout = () => {
        httpClient.post('/api/auth/logout', {
        }, {
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

    return <div>
        <AppBar component="nav" position="fixed"
            sx={{
                width: '100%',
            }}>
            <Toolbar sx={{ paddingLeft: { xs: '2px !important', sm: '24px !important' } }}>
                <IconButton
                    color="inherit"
                >

                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    Jack's Weather App
                </Typography>
                <Box>
                    <Button onClick={handleLogout} sx={{ color: '#fff' }}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
        <div className="content">
            <Outlet />
        </div>

    </div>
}


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="home" element={<AppLayout />} >
                    <Route index element={<Home />} />
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



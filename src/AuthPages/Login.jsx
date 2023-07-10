import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../apiURL';
import Cookies from "js-cookie";
import LinearProgress from '@mui/material/LinearProgress';

function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const changeEmail = e => {
        setEmail(e.target.value);
    }

    const changePassword = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password)
            alert('Please enter all fields');

        else {
            setLoading(true);
            //api call
            const res = await axios.post(apiUrl + "/authentication/login", {
                email: email,
                password: password
            })
            if (res.data.message == 'logged in successfully') {
                //save token in cookie
                // Get the current date
                var currentDate = new Date();

                // Set the expiration date to one month from the current date
                var expirationDate = new Date();
                expirationDate.setMonth(currentDate.getMonth() + 1);

                // Set the cookie with the expiration date
                Cookies.set('access_token', res.data.token, { expires: expirationDate });

                navigate('/');
            }
            else {
                alert(res.data.message)
            }
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (<LinearProgress />) : null}

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        onChange={changeEmail}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={changePassword}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link href="/auth/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </>
    )
}

export default Login
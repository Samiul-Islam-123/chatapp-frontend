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
import axios from "axios";
import apiUrl from '../apiURL';
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';


function Signup() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [avatarSrc, setAvatarSrc] = useState('');


    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changeEmail = e => {
        setEmail(e.target.value);
    }

    const changePassword = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const avatarSrc = `https://api.multiavatar.com/${username}.svg?apikey=Ep1hDx95XQR26B`;
        setAvatarSrc(avatarSrc);

        if (!username || !email || !password)
            alert('Please enter all fields');

        else {
            //proceed further
            const res = await axios.post(`${apiUrl}/authentication/signup`, {
                username: username,
                email: email,
                password: password,
                avatarURL: avatarSrc
            })
            if (res.data.message == 'please check your email') {
                //navigating to verification page
                navigate('/auth/verification');
            }
            else
                alert(res.data.message);
        }
        setLoading(false);
    };

    return (
        <>
            {
                loading ? (<><LinearProgress /></>) : null
            }
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 2, bgcolor: 'secondary.main', width: 100, height: 100 }}>
                    {username ? <img width={100} src={`https://api.multiavatar.com/${username}.svg?apikey=Ep1hDx95XQR26B`} /> : <LockOutlinedIcon />}
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                    <div className="avatar-container">

                    </div>

                    <TextField
                        onChange={changeUsername}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User name"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

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
                        Sign In
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link href="/auth/login" variant="body2">
                                {"ALready have an account? Log in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


        </>
    )
}

export default Signup
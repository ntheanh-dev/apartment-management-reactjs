import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FaLock } from 'react-icons/fa';
import APIs, { authApi, endPoints } from '../../configs/APIs';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);

        try {
            let res = await APIs.post(
                endPoints['login'],
                JSON.stringify({
                    username: data.get('username'),
                    password: data.get('password'),
                }),
                {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                },
            );
            cookie.save('token', res.data?.result?.token);
            setTimeout(async () => {
                let u = await authApi().get(endPoints['myInfo']);
                nav('/');
            }, 100);
        } catch (ex) {
            setOpenAlert(true);
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <FaLock />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng Nhập
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tài khoản"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật Khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Nhớ mật khẩu" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Đăng Nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Quên Mật Khẩu
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/*--------------Loading------------  */}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* ---------------Alert------------- */}
            <Snackbar
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                autoHideDuration={6000}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert severity="warning" va sx={{ width: '100%' }}>
                    Tài Khoản Hoặc Mật Khẩu Không Chính Xác
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;

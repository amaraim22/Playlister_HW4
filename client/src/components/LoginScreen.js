import { useContext } from 'react';
import AuthContext from '../auth'

import Copyright from './Copyright'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function LoginScreen() {
    const { auth } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.loginUser(
            formData.get('email'),
            formData.get('password')
        );

    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Grid container component="main" sx={{ height: '80vh', width: '392vh' }}>
            <CssBaseline />

            <Modal
                aria-describedby="modal-modal-description"
                open={auth.modalVisible}
                className={"modal " + ((auth.modalVisible)? "is-visible": "")}
                >
                    
                <Box sx = {style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {auth.modalMsg}
                    </Typography>
                    <Button 
                    onClick={() => auth.hideModal()}
                    sx = {{ 
                        ml: 15,
                        mt: 2
                    }}
                    variant="contained">Close</Button>
                    
                </Box>
            </Modal>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 6,
                        mx: 4,
                        ml: 55,
                        width: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#be3d3d' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
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
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor:'#fffec1', color:'black' }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" color={'#be3d3d'}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register/" variant="body2" color={'#be3d3d'}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
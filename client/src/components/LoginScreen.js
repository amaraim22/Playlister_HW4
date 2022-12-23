import { useContext } from 'react';
import AuthContext from '../auth'

import Copyright from './Copyright'

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/material';

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

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "black",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    let modalButtonStyle = { ml: 15, mt: 2, backgroundColor:'#d4d4f5', color:"black", 
        '&:hover': {
            backgroundColor: '#c4c4c4',
            color: '#d4d4f5',
        },
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

                <Modal
                aria-describedby="modal-modal-description"
                open={auth.modalVisible}
                className={"modal " + ((auth.modalVisible)? "is-visible": "")}
                >
                    
                <Box sx = {modalStyle}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {auth.modalMsg}
                    </Typography>
                    <Button 
                    onClick={() => auth.hideModal()}
                    sx = {modalButtonStyle}
                    variant="contained">Close</Button>
                    
                </Box>
                </Modal>

                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#be3d3d' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor:'#fffec1', color:"black", 
                            '&:hover': {
                                backgroundColor: '#c4c4c4',
                                color: '#fffec1',
                            }, }}
                        >
                            Log in
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login/" variant="body2" color={'#be3d3d'}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
    );
}
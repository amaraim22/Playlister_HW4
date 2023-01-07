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
        textAlign:'center',
        borderRadius: '10px',
        borderColor: '#c4c4c4',
        borderWidth: '2px',
        borderStyle: 'solid',
    };

    let modalButtonStyle = { mt: 3, backgroundColor:'#cb997e', color:"white", fontWeight:'bold',
        '&:hover': {
            backgroundColor: '#c4c4c4',
            color: '#cb997e',
        },
        fontFamily:'Raleway',
    };

    let inputPropsStyle = {style: {fontSize: 15, fontFamily:'Raleway'}}

    return (
        <div id="splash-screen">
            <Container component="main" maxWidth="xs">
            <CssBaseline />

                <Modal
                aria-describedby="modal-modal-description"
                open={auth.modalVisible}
                className={"modal " + ((auth.modalVisible)? "is-visible": "")}
                >   
                    <Box sx = {modalStyle}>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily:'Raleway', color:'#463f3a' }}>
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '10%',
                        textAlign: 'center',
                        width: '100%',
                        borderRadius: '10px',
                        borderColor: '#c4c4c4',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        fontFamily:'Raleway',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#a5a58d' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ fontFamily:'Raleway', fontWeight: 'bold', fontSize: 25,}}>
                        Log In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '290px' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ fontFamily:'Raleway' }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputProps={inputPropsStyle}
                                    InputLabelProps={inputPropsStyle}
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
                                    inputProps={inputPropsStyle}
                                    InputLabelProps={inputPropsStyle}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor:'#cb997e', color:"white", fontWeight:'bold',
                            '&:hover': {
                                backgroundColor: '#c4c4c4',
                                color: '#cb997e',
                            },
                            fontFamily:'Raleway',
                            width: '290px',
                            }}
                        >
                            Log in
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                            <Typography variant="body2" sx={{ fontFamily:'Raleway' }}>
                                Don't have an account? <Link href="/register/" variant="body2" color={'#a5a58d'} sx={{ fontFamily:'Raleway', fontWeight:'bold', textDecoration: 'none' }}> Sign Up</Link>
                            </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Container>
        </div>
    );
}
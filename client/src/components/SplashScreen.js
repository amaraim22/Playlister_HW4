import { useContext } from 'react';
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    let buttonStyle = { backgroundColor:'#a5a58d', color:"white", fontWeight:'bold',
        '&:hover': {
            backgroundColor: '#c4c4c4',
            color: '#a5a58d',
        },
        margin:1,
        fontFamily:'Raleway',
        width: '230px',
    };
    let guestButtonStyle = { backgroundColor:'#cb997e', color:"white", fontWeight:'bold',
        '&:hover': {
            backgroundColor: '#c4c4c4',
            color: '#cb997e',
        },
        margin:1,
        fontFamily:'Raleway',
        width: '230px',
    };
    const history = useHistory();

    const handleGuest = () => {    
        console.log("handleGuest");
        auth.guestUser(true);
    }

    return (
        <div id="splash-screen">
        <Container component="main" maxWidth="xs">
        <CssBaseline />
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
                }}
            >
                <Typography sx={{fontWeight: 'bold', fontSize: 25, color: 'black', fontFamily:'Raleway'}}> 
                    Welcome to <span id="playlister-text">Playlister</span>
                </Typography>
                <Typography sx={{fontSize: 15, color: 'black', fontFamily:'Raleway', width:'90%'}}>
                    need a place to hold all your favorite songs in a playlist and share them with friends and community?
                </Typography>
                <Stack mt={'5%'} mb={'5%'}> 
                    <Button className="splash-screen-button" variant="contained" sx = {guestButtonStyle} onClick={handleGuest}>Continue as Guest</Button>
                    <Button className="splash-screen-button" variant="contained" sx = {buttonStyle} onClick={() => history.push("/register/")}>Create Account</Button>
                    <Button className="splash-screen-button" variant="contained" sx = {buttonStyle} onClick={() => history.push("/login/")}>Login</Button>
                </Stack>

                <Typography sx={{fontSize: 15, color: 'black', fontFamily:'Raleway'}}> 
                © Amara Im 2022
                </Typography>
            </Box>
        </Container>
        </div>
        
    )
}
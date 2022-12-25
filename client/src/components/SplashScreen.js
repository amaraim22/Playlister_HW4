import { useContext } from 'react';
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);

    let buttonStyle = { backgroundColor:'#fffec1', color:"black", 
        '&:hover': {
            backgroundColor: '#c4c4c4',
            color: '#fffec1',
        },
        margin:1
    };
    let guestButtonStyle = { backgroundColor:'#d4d4f5', color:"black", 
        '&:hover': {
            backgroundColor: '#c4c4c4',
            color: '#d4d4f5',
        },
        margin:1
    };
    const history = useHistory();

    const handleGuest = () => {    
        console.log("handleGuest");
        auth.guestUser(true);
    }

    return (
        
        <div id="splash-screen">
            <div id="splash-screen-welcome">
                <div id="splash-screen-text">
                    <Typography sx={{fontWeight: 'bold', fontSize: 25, color: 'black'}}> 
                    Welcome to <span id="playlister-text">Playlister</span>
                    </Typography>
                    <Typography sx={{fontSize: 18, color: 'black'}}>
                    Need a place to hold all your favorite songs in a playlist and share them with your friends and the community?
                    </Typography>
                </div>
                
                <Stack position="relative" width={'50%'}  ml={'25%'} mt={'5%'} mb={'5%'} spacing={"3%"}> 
                    <Button className="splash-screen-button" variant="contained" sx = {buttonStyle} onClick={() => history.push("/register/")}>Create Account</Button>
                    <Button className="splash-screen-button" variant="contained" sx = {buttonStyle} onClick={() => history.push("/login/")}>Login</Button>
                    <Button className="splash-screen-button" variant="contained" sx = {guestButtonStyle} onClick={handleGuest}>Continue as Guest</Button>
                </Stack>

                <Typography sx={{fontSize: 15, color: 'black'}}> 
                © Amara Im 2022
                </Typography>
            </div>
        </div>
        
    )
}
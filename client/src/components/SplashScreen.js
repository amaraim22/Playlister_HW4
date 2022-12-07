//import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom'
//import { GlobalStoreContext } from '../store'

export default function SplashScreen() {
    //const { store } = useContext(GlobalStoreContext);

    let buttonStyle = { backgroundColor:'#fffec1', color:"black"};
    const history = useHistory();

    const handleGuest = () => {    
        console.log("handleGuest");
    }


    return (
        
        <div id="splash-screen">
            <div id="splash-screen-welcome">
                <div id="splash-screen-text">
                    <Typography sx={{fontWeight: 'bold', fontSize: 25, color: 'black'}}> 
                    Welcome to <span id="playlister-text">Playlister</span>
                    </Typography>
                    <Typography sx={{fontSize: 20, color: 'black'}}>
                    Need a place to hold all your favorite songs in a playlist and share them with your friends and the community?
                    </Typography>
                </div>
                
                <Stack position="relative" width={'50%'}  ml={'25%'} mt={'5%'} mb={'5%'} spacing={"3%"}> 
                    <Button className="splash-screen-button" variant="contained" sx = {buttonStyle} onClick={() => history.push("/register/")}>Create Account</Button>
                    <Button className="splash-screen-button" variant="contained" sx = {buttonStyle} onClick={() => history.push("/login/")}>Login</Button>
                    <Button className="splash-screen-button" variant="contained" sx = {{backgroundColor:'#d4d4f5', color:"black"}} onClick={handleGuest}>Continue as Guest</Button>
                </Stack>

                <Typography sx={{fontSize: 15, color: 'black'}}> 
                © Amara Im 2022
                </Typography>
            </div>
        </div>
        
    )
}
import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import GuestScreen from './GuestScreen';

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.user == null)
        auth.loggedIn = false;

    if(auth.isGuest) 
        return <GuestScreen />
    
    if (auth.loggedIn && auth.user != null)
        return <HomeScreen />
    else
        return <SplashScreen />
}
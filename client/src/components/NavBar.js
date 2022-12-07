import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Person from '@mui/icons-material/PersonOutlined';
import Home from '@mui/icons-material/HomeOutlined';
import Groups from '@mui/icons-material/GroupsOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Sort from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react'

export default function NavBar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { isGuest } = props;

    function handleHome() {
        store.changePageView("HOME");       
    }
    function handleAll(){
        store.changePageView("ALL");
    }
    function handleUser(){
        store.changePageView("USER");
    }

    let homeColor = "";
    if(isGuest)
        homeColor = {fontSize: 40, color:'gray'};
    else if(store.pageView === "HOME")
        homeColor = {fontSize: 40, color:'#FFFEC1'};
    else   
        homeColor = {fontSize: 40, color:'black'};

    let allColor = "";
    if(store.pageView === "ALL")
        allColor = {fontSize: 40, color:'#FFFEC1'};
    else   
        allColor = {fontSize: 40, color:'black'};

    let userColor = "";
    if(store.pageView === "USER")
        userColor = {fontSize: 40, color:'#FFFEC1'};
    else   
        userColor = {fontSize: 40, color:'black'};

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar id="nav-bar" position="static">
                <Toolbar sx = {{ backgroundColor: '#E0E0E0'}}>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton disabled={isGuest} onClick={handleHome}><Home sx={homeColor}></Home></IconButton>
                        <IconButton onClick={handleAll}><Groups sx={allColor}></Groups></IconButton>
                        <IconButton onClick={handleUser}><Person sx={userColor}></Person></IconButton>
                    </Stack>
                    <Box sx={{flexGrow:1, ml:'5%'}}>
                        <TextField sx={{background:"white", width:"80%"}} label="Search"></TextField>
                    </Box>

                    <Typography sx={{fontWeight:"bold", color:'black'}}> SORT BY </Typography>
                    <IconButton><Sort sx={{ fontSize: 40, color:'black'}}></Sort></IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
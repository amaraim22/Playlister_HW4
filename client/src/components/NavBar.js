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
import { useContext, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NavBar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { isGuest } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

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

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSortName = () => {
        console.log("Sort Name");
        store.sortIdNamePairs("Sort Name", store.pageView);
        handleMenuClose();
        store.changePageView(store.pageView); 
    }
    const handleSortPublish = () => {
        store.sortIdNamePairs("Sort Publish Date", store.pageView);
        handleMenuClose();
        store.changePageView(store.pageView); 
    }

    function handleKeyPress(event){
        if (event.code === "Enter"){
            console.log(event.target.value);
        }
    }

    const menuId = 'primary-search-account-menu';

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
                        <TextField 
                            onKeyUp={(event)=> handleKeyPress(event)}  
                            sx={{background:"white", width:"80%"}} 
                            label="Search"></TextField>
                    </Box>

                    <Typography sx={{fontWeight:"bold", color:'black'}}> SORT BY </Typography>
                    <IconButton onClick={handleProfileMenuOpen}><Sort sx={{ fontSize: 40, color:'black'}}></Sort></IconButton>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleSortName}>Name (A - Z)</MenuItem>
                <MenuItem onClick={handleSortPublish}>Publish Date (Newest)</MenuItem>
                <MenuItem >Listens (High - Low)</MenuItem>
                <MenuItem >Likes (High - Low)</MenuItem>
                <MenuItem >Dislikes (High - Low)</MenuItem>
            </Menu>
        </Box>
    );
}
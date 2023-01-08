import { GlobalStoreContext } from '../store'
import { useContext, useState } from 'react'
import AuthContext from '../auth'

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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

export default function NavBar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleChangeView = (viewType) => (event) => {
        store.changePageView(viewType);     
    }
    const handleSort = (sortType) => (event) => {
        store.sortPlaylists(sortType, store.pageView);
        handleMenuClose();
    }
    function handleKeyPress(event){
        if (event.code === "Enter"){
            console.log("Search by " + event.target.value);
            store.changeFilter(event.target.value, store.pageView); 
        }
    }

    const menuId = 'primary-search-account-menu';
    let inputPropsStyle = {style: {fontSize: 15, fontFamily:'Raleway'}}
    let sortItemStyle = {fontFamily:'Raleway', fontWeight:'bold', color:'#463f3a'}

    let sortMenuItems = 
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
            <MenuItem onClick={handleSort("Sort Creation Date")} style={sortItemStyle}>By Creation Date (Old-New)</MenuItem>
            <MenuItem onClick={handleSort("Sort Last Edit Date")} style={sortItemStyle}>By Last Edit Date (New-Old)</MenuItem>
            <MenuItem onClick={handleSort("Sort Name")} style={sortItemStyle}>By Name (A-Z)</MenuItem>
        </Menu>
    
    if (store.pageView === "ALL" || store.pageView === "USER") {
        sortMenuItems = 
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
                <MenuItem onClick={handleSort("Sort Name")} style={sortItemStyle}>Name (A - Z)</MenuItem>
                <MenuItem onClick={handleSort("Sort Publish Date")} style={sortItemStyle}>Publish Date (Newest)</MenuItem>
                <MenuItem onClick={handleSort("Sort Listens")} style={sortItemStyle}>Listens (High - Low)</MenuItem>
                <MenuItem onClick={handleSort("Sort Likes")} style={sortItemStyle}>Likes (High - Low)</MenuItem>
                <MenuItem onClick={handleSort("Sort Dislikes")} style={sortItemStyle}>Dislikes (High - Low)</MenuItem>
            </Menu>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar id="nav-bar" position="static">
                <Toolbar sx = {{ backgroundColor: '#ffe8d6'}}>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Tooltip title={<span style={{ fontFamily:'Raleway', fontSize:'15px' }}>HOME</span>} placement="bottom">
                            <IconButton disabled={(auth.isGuest)} onClick={handleChangeView("HOME")}>
                                <Home sx={(auth.isGuest) ? {fontSize: 40, color:'#bcb8b1'} : 
                                    (store.pageView === "HOME") ? {fontSize: 40, color:'#e8ac65'} : {fontSize: 40, color:'#463f3a'} }
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<span style={{ fontFamily:'Raleway', fontSize:'15px' }}>ALL PLAYLISTS</span>} placement="bottom">
                            <IconButton onClick={handleChangeView("ALL")}>
                                <Groups sx={ (store.pageView === "ALL") ? {fontSize: 40, color:'#e8ac65'} : {fontSize: 40, color:'#463f3a'} }/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={<span style={{ fontFamily:'Raleway', fontSize:'15px' }}>ALL USERS</span>} placement="bottom">
                            <IconButton onClick={handleChangeView("USER")}>
                                <Person sx={(store.pageView === "USER") ? {fontSize: 40, color:'#e8ac65'} : {fontSize: 40, color:'#463f3a'} }/>
                            </IconButton>
                        </Tooltip>  
                    </Stack>
                    <Box sx={{flexGrow:1, ml:'5%'}}>
                        <TextField 
                        inputProps={inputPropsStyle}
                        InputLabelProps={inputPropsStyle}
                        onKeyUp={(event)=> handleKeyPress(event)}  
                        sx={{background:"white", width:"80%"}} 
                        label="Search">
                        </TextField>
                    </Box>
                    <Typography sx={{fontWeight:"bold", color:'#463f3a', fontFamily:'Raleway'}}> SORT BY </Typography>
                    <IconButton onClick={handleProfileMenuOpen}><Sort sx={{ fontSize: 40, color:'#463f3a'}}></Sort></IconButton>
                </Toolbar>
            </AppBar>
            { sortMenuItems }
        </Box>
    );
}
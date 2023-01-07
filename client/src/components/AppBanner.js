import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        console.log("open menu");
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    let menuItemStyle = {fontFamily:'Raleway', fontWeight:'bold', color:'#463f3a'}

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
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
            <MenuItem onClick={handleMenuClose}><a style={menuItemStyle} href='/login/'>Login</a></MenuItem>
            <MenuItem onClick={handleMenuClose}><a style={menuItemStyle} href='/register/'>Create Account</a></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
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
            <MenuItem onClick={handleLogout} sx={menuItemStyle}>Logout</MenuItem>
        </Menu>        

    let menu = loggedOutMenu;
    if (auth.loggedIn && auth.user != null) {
        menu = loggedInMenu;
    }
    
    function getAccountMenu(loggedIn, user) {
        let userInitials = auth.getUserInitials();
        if (loggedIn && user != null) 
            return <div id="userInitials-icon"
                    onClick={handleProfileMenuOpen}
                    ><text id="userInitials-text">{userInitials}</text></div>;
        else
            return <AccountCircle sx={{color: '#6b705c', fontSize: 30 }}/>;
    }

    function handleGuest() {
        if (!(auth.loggedIn && auth.user != null))
            auth.guestUser(false);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx = {{ backgroundColor: '#ddbea9'}}>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: '#6b705c', fontSize:35, fontFamily: 'Brush Script MT', fontWeight: 'bold' }} 
                            to='/'
                            onClick={handleGuest}
                            >Playlister</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { getAccountMenu(auth.loggedIn, auth.user) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}
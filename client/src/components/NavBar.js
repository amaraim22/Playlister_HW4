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
import TextField from '@mui/material/TextField';;

export default function NavBar() {

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
                        <IconButton><Home sx={{fontSize: 40, color:'black'}}></Home></IconButton>
                        <IconButton><Groups sx={{fontSize: 40, color:'black'}}></Groups></IconButton>
                        <IconButton><Person sx={{fontSize: 40, color:'black'}}></Person></IconButton>
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
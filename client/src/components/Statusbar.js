import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleCreateNewList() {
        store.createNewList();
    }

    let statusbar = "";
    if (store) {
        if (store.pageView === "HOME") {
            statusbar = 
            <div id="playlister-statusbar">
                <IconButton onClick={handleCreateNewList}>
                    <AddIcon sx={{color: "#463f3a", fontSize: 60}}  />
                </IconButton> 
                <Typography sx={{color: "#463f3a", fontFamily:'Raleway', fontWeight:'bold'}} variant="h4">Add New Playlist</Typography>  
            </div>
        }
        else {
            statusbar = <div id="playlister-statusbar"></div>
        }
    }

    return (
        <div>
            { statusbar }
        </div>
    );
}

export default Statusbar;
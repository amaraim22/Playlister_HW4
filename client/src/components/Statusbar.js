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

    return (
        <div id="playlister-statusbar">
            <IconButton onClick={handleCreateNewList}>
                <AddIcon sx={{color: "black", fontSize: 60}}  />
            </IconButton> 
            <Typography sx={{color: "black"}} variant="h4">Your Lists</Typography>   
        </div>
    );
}

export default Statusbar;
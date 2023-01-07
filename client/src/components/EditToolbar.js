import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import Button from '@mui/material/Button';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    let buttonStyle = { color:"white", fontWeight:'bold', fontFamily:'Raleway', backgroundColor:'#cb997e', 
    '&:hover':{ backgroundColor:'gray' }, margin:1 }

    return (
        <div id="edit-toolbar">
            <Button 
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={handleUndo}
                variant="contained"
                sx={buttonStyle}>
                    Undo
            </Button>
            <Button 
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={handleRedo}
                variant="contained"
                sx={buttonStyle}>
                    Redo
            </Button>
        </div>
    )
}

export default EditToolbar;
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import AuthContext from '../auth';
import Box from '@mui/material/Box';
import { Accordion,Typography, Card, CardHeader,Stack, Link} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import {ThumbUpOutlined, ThumbDownOutlined, DeleteOutlined} from '@mui/icons-material'

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleLoadPlayer(event, id) {
        console.log("HandleLoadPlaylister: " + id);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let cardElement =
        <Card className = {selectClass} 
                onClick={(event) => {handleLoadPlayer(event, idNamePair._id)}} 
                key={"listcard-" + idNamePair._id} sx={{borderRadius: 5,border:1}}>
        <CardHeader
        onDoubleClick={handleToggleEdit}
        title={idNamePair.name}
        subheader={"By: " + idNamePair.ownerUsername}
        action={
            <div id="buttonbox" > 
                <Stack direction="row" justifyContent="space-between" spacing={2} >
                    <IconButton>
                    <ThumbUpOutlined sx={{fontSize:35}}></ThumbUpOutlined>
                    </IconButton>

                    <Typography sx={{paddingTop:1, fontSize:25}}>{0}</Typography>

                    <IconButton>
                    <ThumbDownOutlined sx={{fontSize:35}}></ThumbDownOutlined>
                    </IconButton>

                    <Typography sx={{paddingTop:1, fontSize:25}}>{0}</Typography>
                </Stack>
            </div>
            
        }
        >
        <IconButton >
            <ExpandLess></ExpandLess>
        </IconButton>   

        </CardHeader>
        </Card>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
                sx={{fontSize: '20px'}}
            />
    }
    return (
        cardElement
    );
}

export default ListCard;
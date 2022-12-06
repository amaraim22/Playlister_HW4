import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import AuthContext from '../auth';
import Box from '@mui/material/Box';
import { Typography, Card, CardHeader,Stack} from '@mui/material';
import {ThumbUpOutlined, ThumbDownOutlined} from '@mui/icons-material';

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
    const { idNamePair, selected, expanded } = props;

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

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let cardElement =
        <Card 
            key={"listcard-" + idNamePair._id}
            sx={{width:'100%'}}>
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
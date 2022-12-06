import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import AuthContext from '../auth';
import Box from '@mui/material/Box';
import { Accordion,Typography, Card, CardHeader,Stack, Link} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ThumbUpOutlined, ThumbDownOutlined} from '@mui/icons-material';
import List from '@mui/material/List';

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'

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

    const [expanded, setExpanded] = useState(false);

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

    function handleAddNewSong() {
        store.addNewSong();
    }
    const handleChange = panel => (event, isExpanded) => {
        console.log(panel)
        console.log(isExpanded)
        setExpanded(isExpanded ? panel : false);
    };

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let songElements = "";
    if(store.currentList != null) {
        songElements = 
            <Box sx={{ flexGrow: 1 }}>
            <List 
                id="playlist-cards" 
                sx={{ width: '100%', bgcolor: '#c4c4c4' }}
            >
                {
                    store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))  
                }
            </List>            
            { modalJSX }
            </Box>
    }

    let cardElement =
        <Card 
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
        </CardHeader>
        <Accordion
            expanded={expanded === idNamePair._id}
            key={idNamePair._id}
            onChange={handleChange(idNamePair._id)}
            >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}></AccordionSummary>

            <AccordionDetails>
                {songElements}
                <IconButton onClick={handleAddNewSong}>
                    <AddIcon sx={{color: "black", fontSize: 60}}  />
                </IconButton> 
            </AccordionDetails>
        </Accordion>

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
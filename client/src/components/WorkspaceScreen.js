import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar.js';
import Statusbar from './Statusbar.js';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import AllScreen from './AllScreen'
import SongCard from './SongCard.js'
import Box from '@mui/material/Box';
import EditToolbar from './EditToolbar';
import Button from '@mui/material/Button';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleDeleteList(event) {
        store.markListForDeletion(store.currentList._id);
    }
    function handlePublishList(event) {
        store.publishPlaylist(store.currentList);
        store.loadIdNamePairs();
        setExpanded(false);
    }
    function handleDuplicateList() {
        store.duplicatePlaylist(store.currentList);
        store.closeCurrentList();
        setExpanded(false);
    }

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        if (isExpanded === true) {
            store.setCurrentList(panel);
        }
        else
            store.closeCurrentList(); 
    };

    let songElements = "";
    let toolbar = "";

    if (store) {
        let modalJSX = "";
        if (store.isEditSongModalOpen()) {
            modalJSX = <MUIEditSongModal />;
        }
        else if (store.isRemoveSongModalOpen()) {
            modalJSX = <MUIRemoveSongModal />;
        }

        if(store.currentList != null) {
            if(store.currentList.publishedDate == null) {
                toolbar = 
                <Box>
                    <IconButton onClick={handleAddNewSong}>
                        <AddIcon sx={{color: "black", fontSize: 60}}  />
                    </IconButton> <br></br>
                    <EditToolbar />
                    <div id="publish-toolbar">
                        <Button 
                            id='publish-button'
                            onClick={handlePublishList}
                            variant="contained">
                                Publish
                        </Button>
                        <Button 
                            id='delete-button'
                            onClick={handleDeleteList}
                            variant="contained">
                                Delete
                        </Button>
                        <Button
                            id='duplicate-button'
                            onClick={handleDuplicateList}
                            variant="contained">
                                Duplicate
                        </Button>
                    </div>
                </Box>

                songElements = 
                <Box sx={{ flexGrow: 1 }}>
                <List 
                    id="playlist-cards" 
                    sx={{ width: '100%'}}
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
            else {
                toolbar = 
                <Box>
                    <div id="publish-toolbar">
                        <Button 
                            id='delete-button'
                            onClick={handleDeleteList}
                            variant="contained">
                                Delete
                        </Button>
                        <Button
                            id='duplicate-button'
                            onClick={handleDuplicateList}
                            variant="contained">
                                Duplicate
                        </Button>
                    </div>
                </Box>

                songElements = 
                <Box sx={{ flexGrow: 1 }}>
                <List 
                    id="playlist-cards" 
                    sx={{ width: '100%'}}
                >
                    {
                        store.currentList.songs.map((song, index) => (
                            <ListItem
                                key={"list-song-" + index}
                            >
                                {index + 1}. {song.title} by {song.artist}
                            </ListItem>
                        ))  
                    }
                </List>            
                { modalJSX }
                </Box>
            }
        }
    }
    
    return (
        <List sx={{ width: '60%', left: '1%', bgcolor: '#e0e0e0', overflowY:"scroll" }}>
        {
            store.idNamePairs.map((pair) => (
                <Accordion
                expanded={expanded === pair._id}
                key={pair._id}
                onChange={handleChange(pair._id)}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        published={(pair.publishedDate != null)}
                        />
                    </AccordionSummary>

                    <AccordionDetails>
                        {songElements}
                        {toolbar}
                    </AccordionDetails>
                </Accordion>
                
            ))
        }
        </List>
    )
}

export default WorkspaceScreen;
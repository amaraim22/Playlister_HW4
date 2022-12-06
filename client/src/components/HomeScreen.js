import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar.js';
import Statusbar from './Statusbar.js';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'
import Box from '@mui/material/Box';
import EditToolbar from './EditToolbar';
import Button from '@mui/material/Button';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
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
        store.publishPlaylist(store.currentList._id);
    }

    const handleChange = panel => (event, isExpanded) => {
        console.log(panel)
        console.log(isExpanded)
        setExpanded(isExpanded ? panel : false);
        if (isExpanded === true) {
            store.setCurrentList(panel);
        }
        else
            store.closeCurrentList(); 
    };

    let listCard = "";
    if (store) {

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

        listCard = 
            <List sx={{ width: '60%', left: '1%', bgcolor: '#e0e0e0', mt: '6%', overflowY:"scroll" }}>
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
                        />
                        </AccordionSummary>

                        <AccordionDetails>
                            {songElements}
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
                                    variant="contained">
                                        Duplicate
                                </Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    
                ))
            }
            </List>;
    }
    return (
        <div id="playlist-selector">
            <NavBar/>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            <Statusbar />
        </div>)
}

export default HomeScreen;
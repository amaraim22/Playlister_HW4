import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import SongCard from './SongCard.js'
import EditToolbar from './EditToolbar';
import ListCard from './ListCard.js'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkspaceScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [expand, setExpanded] = useState(false);

    useEffect(() => {
        store.loadIdNamePairs();
        store.getAllPlaylists();
    }, []);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleDeleteList() {
        store.markListForDeletion(store.currentList._id);
    }
    function handlePublishList() {
        store.publishPlaylist(store.currentList);
        store.loadIdNamePairs();
        setExpanded(false);
    }
    function handleDuplicateList() {
        store.duplicatePlaylist(store.currentList);
        store.closeCurrentList();
        setExpanded(false);
    }

    const handleChange = (panel, isExpanded) => (event) => {
        console.log(isExpanded);
        event.stopPropagation();
        event.preventDefault();
        setExpanded(isExpanded ? panel : false);
        console.log(isExpanded);
        if (isExpanded === true) {
            store.setCurrentList(panel);
        }
        else
            store.closeCurrentList(); 
    };

    let songElements = "";
    let toolbar = "";

    let buttonStyle = { backgroundColor:'#be3d3d', '&:hover':{ backgroundColor:'gray' }, margin:1 }

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
                    <Box>
                        <Button onClick={handleAddNewSong} sx={{marginLeft:'3%', width:"94%", backgroundColor:'#be3d3d', '&:hover':{ backgroundColor:'gray' }}}>
                            <AddIcon sx={{color: "white", fontSize: 40}}  /> 
                            <span style={{color:"white"}}>Add New Song</span>
                        </Button>  
                    </Box> <br></br>
                    <EditToolbar />
                    <div id="publish-toolbar">
                        <Button 
                            id='publish-button'
                            onClick={handlePublishList}
                            variant="contained"
                            sx={buttonStyle}>
                                Publish
                        </Button>
                        <Button 
                            id='delete-button'
                            onClick={handleDeleteList}
                            variant="contained"
                            sx={buttonStyle}>
                                Delete
                        </Button>
                        <Button
                            id='duplicate-button'
                            onClick={handleDuplicateList}
                            variant="contained"
                            sx={buttonStyle}>
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
                            variant="contained"
                            sx={buttonStyle}>
                                Delete
                        </Button>
                        <Button
                            id='duplicate-button'
                            onClick={handleDuplicateList}
                            variant="contained"
                            sx={buttonStyle}>
                                Duplicate
                        </Button>
                    </div>
                </Box>

                songElements = 
                <Box sx={{ flexGrow: 1 }}>
                <List 
                    id="playlist-cards" 
                    sx={{ width: '96%', backgroundColor:'#2C2F70', borderRadius:'5px' }}
                >
                    {
                        store.currentList.songs.map((song, index) => (
                            <ListItem
                                key={"list-song-" + index}
                                sx={{ color:'white', fontSize:20 }}
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
        <List sx={{ width: '98%', left: '1%', bgcolor: '#e0e0e0', overflowY:"scroll" }}>
        {
            store.idNamePairs.map((pair) => (
                <Accordion
                expanded={expand === pair._id}
                key={pair._id}
                >
                    <AccordionSummary>
                        <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        published={(pair.publishedDate != null)}
                        />
                        <Button 
                        onClick={handleChange(pair._id, !(expand === pair._id))} 
                        sx={{ '&:hover':{ backgroundColor:'#ffffff'} , 
                            "& .MuiTouchRipple-child": { backgroundColor: `#d3d3d3 !important` }
                        }}
                        >
                            {(expand === pair._id) ? 
                            <ExpandLessIcon sx={{ color:'black' }} /> : 
                            <ExpandMoreIcon sx={{ color:'black' }} />}
                        </Button>
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
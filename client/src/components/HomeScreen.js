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
import PlaylisterYoutubePlayer from './PlaylisterYoutubePlayer';
import Stack from '@mui/material/Stack';

import { FastRewind, Stop, PlayArrow, FastForward } from '@mui/icons-material';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [expanded, setExpanded] = useState(false);
    const [songStatus, setSongStatus] = useState("");

    function handleStopPlaying() {
        setSongStatus("STOP");
    }
    function handleStartPlaying() {
        setSongStatus("START");
    }

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

    let listCard = "";
    let youtubePlayer = "";
    if (store) {
        console.log(store.pageView);
        let modalJSX = "";
        if (store.isEditSongModalOpen()) {
            modalJSX = <MUIEditSongModal />;
        }
        else if (store.isRemoveSongModalOpen()) {
            modalJSX = <MUIRemoveSongModal />;
        }

        let songElements = "";
        let toolbar = "";

        if(store.currentList != null) {
            youtubePlayer = <PlaylisterYoutubePlayer 
                                currentList={store.currentList} 
                                songStatus={songStatus}
                                />

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

        if(store.pageView === "HOME") {
            listCard = 
            <List sx={{ width: '98%', left: '1%', bgcolor: '#e0e0e0', overflowY:"scroll" }}>
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
            </List>;
        }
        else if(store.pageView === "ALL") {
            listCard = <AllScreen isGuest={false} />;
        }
    }
    return (
        <div id="playlist-selector">
            <NavBar isGuest={false} />
            <Stack direction="row" spacing={1}>
                <div id="list-selector-list">
                        { listCard }
                    <MUIDeleteModal />
                </div>
                <div id="youtube-player">
                    { youtubePlayer }
                    <div id="youtube-player-text">
                        <Typography sx={{paddingTop:1, fontSize:20, textAlign:'center'}}>Now Playing</Typography>
                    </div>
                    <div id="youtube-player-button">
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} >
                            <IconButton>
                                <FastRewind sx={{fontSize:35, color:'black'}}></FastRewind>
                            </IconButton>
                            <IconButton>
                                <Stop onClick={handleStopPlaying} sx={{fontSize:35, color:'black'}}></Stop>
                            </IconButton>
                            <IconButton>
                                <PlayArrow onClick={handleStartPlaying} sx={{fontSize:35, color:'black'}}></PlayArrow>
                            </IconButton>
                            <IconButton>
                                <FastForward sx={{fontSize:35, color:'black'}}></FastForward>
                            </IconButton>
                        </Stack>
                    </div>
                </div>
            </Stack>
            <Statusbar />
        </div>)
}

export default HomeScreen;
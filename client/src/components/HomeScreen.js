import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'

import MUIDeleteModal from './MUIDeleteModal'
import NavBar from './NavBar.js';
import Statusbar from './Statusbar.js';
import AllScreen from './AllScreen'
import WorkspaceScreen from './WorkspaceScreen'
import PlaylisterYoutubePlayer from './PlaylisterYoutubePlayer';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [playerComment, setPlayerComment] = useState("PLAYER");

    useEffect(() => {
        store.loadIdNamePairs();
        store.getAllPlaylists();
    }, []);

    function togglePlayer() {
        setPlayerComment("PLAYER");
    }
    function toggleComment() {
        setPlayerComment("COMMENT");
    }

    let listCard = "";
    let youtubePlayer = "";

    if (store) {
        console.log(store.currentList);
        if(store.currentList != null) {
            if (playerComment === "PLAYER") {
                youtubePlayer = 
                <div id="youtube-player">
                    <Box>
                        <Button 
                            id='get-player-button'
                            variant="contained"
                            onClick={togglePlayer}
                            sx={{ backgroundColor:'#be3d3d', color:'white', '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                                Player
                        </Button>
                        <Button
                            id='get-comments-button'
                            variant="contained"
                            onClick={toggleComment}
                            sx={{ backgroundColor: '#d4d4f5', color:'black', '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                                Comments
                        </Button>
                    </Box>
                    <PlaylisterYoutubePlayer 
                        currentList={store.currentList} 
                        />
                </div>
            }
            else if (playerComment === "COMMENT") {
                youtubePlayer = 
                <div id="youtube-player">
                    <Box>
                        <Button 
                            id='get-player-button'
                            variant="contained"
                            onClick={togglePlayer}
                            sx={{ backgroundColor: '#d4d4f5', color:'black', '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                                Player
                        </Button>
                        <Button
                            id='get-comments-button'
                            variant="contained"
                            onClick={toggleComment}
                            sx={{ backgroundColor: '#be3d3d', color:'white', '&:hover':{ backgroundColor:'gray', color:'white'} }}>
                                Comments
                        </Button>
                    </Box>
                </div>
            }
        }  

        if(store.pageView === "HOME") {
            listCard = 
            <div id="list-selector-list">           
                <WorkspaceScreen isGuest={false} />
            </div>;
        }
        else if(store.pageView === "ALL") {
            listCard = 
            <div id="list-selector-list"> 
                <AllScreen isGuest={false} />
            </div>;
        }
    }

    return (
        <div id="playlist-selector">
            <NavBar isGuest={false} />
            <Stack direction="row" spacing={1}>
                { listCard }
                <MUIDeleteModal />
                { youtubePlayer }
            </Stack>
            <Statusbar />
        </div> )
}

export default HomeScreen;
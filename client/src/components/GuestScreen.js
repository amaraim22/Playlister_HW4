import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'

import AllScreen from './AllScreen'
import NavBar from './NavBar.js';
import Statusbar from './Statusbar.js';
import UserScreen from './UserScreen'
import PlaylisterYoutubePlayer from './PlaylisterYoutubePlayer';
import CommentsBox from './CommentsBox';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const GuestScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [playerComment, setPlayerComment] = useState("PLAYER");

    useEffect(() => {
        store.getAllPlaylists();
        store.changePageView("ALL");
    }, []);

    function togglePlayer() {
        setPlayerComment("PLAYER");
    }
    function toggleComment() {
        setPlayerComment("COMMENT");
    }

    let listCard = "";
    let youtubePlayer = "";
    let playerCommentBox = "";

    if(store) {
        if (store.currentList != null) {
            if (playerComment === "PLAYER") {
                playerCommentBox = <PlaylisterYoutubePlayer currentList={store.currentList} />
            }
            else {
                playerCommentBox = 
                <div>
                    <div id="comments-box">
                        <CommentsBox />
                    </div>
                </div>
            }

            youtubePlayer = 
            <div id="youtube-player">
                <Box>
                    <Button 
                        id='get-player-button'
                        variant="contained"
                        onClick={togglePlayer}
                        sx={{ backgroundColor: (playerComment === "PLAYER") ? '#be3d3d' : '#d4d4f5', 
                        color:'white', 
                        '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                            Player
                    </Button>
                    <Button
                        id='get-comments-button'
                        variant="contained"
                        onClick={toggleComment}
                        disabled={(store.currentList.publishedDate === null)}
                        sx={{ backgroundColor: (playerComment === "PLAYER") ? '#d4d4f5' : '#be3d3d', 
                        color:'white', 
                        '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                            Comments
                    </Button>
                    { playerCommentBox }
                </Box>
            </div>
        }  

        if(store.pageView === "ALL") {
            listCard = <div id="list-selector-list"><AllScreen /></div>;
        }
        else if(store.pageView === "USER") {
            if(store.filter !== "") {
                listCard = 
                <div id="list-selector-list"><UserScreen /></div>;
            }
            else {
                listCard = 
                    <React.Fragment>
                    <ListItem sx={{mt:'10px', width:'99%'}}>
                        <ListItemText 
                        primary={
                        <Stack justifyContent="center">
                            <Typography type="body2" sx={{ fontFamily:'Raleway', fontWeight:'bold', color:'#463f3a', textAlign:'center' }}>
                                Search for Users . . . </Typography>
                        </Stack>}/>
                    </ListItem>
                    </React.Fragment>
            }
        }
    }
    return (
        <div id="playlist-selector">
            <NavBar />
            <Stack direction="row" spacing={1}>
                { listCard }
                { youtubePlayer }
            </Stack>
            <Statusbar />
        </div>)
}

export default GuestScreen;
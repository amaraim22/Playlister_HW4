import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'

import MUIDeleteModal from './MUIDeleteModal'
import NavBar from './NavBar.js';
import Statusbar from './Statusbar.js';
import AllScreen from './AllScreen'
import UserScreen from './UserScreen'
import WorkspaceScreen from './WorkspaceScreen'
import PlaylisterYoutubePlayer from './PlaylisterYoutubePlayer';
import CommentsBox from './CommentsBox';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [playerComment, setPlayerComment] = useState("PLAYER");
    const [commentValue, setCommentValue] = useState("");

    useEffect(() => {
        store.loadIdNamePairs();
        store.getAllPlaylists();
        store.changePageView("HOME");
    }, []);

    function togglePlayer() {
        setPlayerComment("PLAYER");
    }
    function toggleComment() {
        setPlayerComment("COMMENT");
    }

    function handleKeyPress(event){
        if (event.code === "Enter"){
            store.addComment(store.currentList, event.target.value);
            setCommentValue("");
        }
    }

    let listCard = "";
    let youtubePlayer = "";
    let playerCommentBox = "";

    if (store) {
        console.log(store.currentList);
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
                    <Box sx={{flexGrow:1, mt:'2%', mb:'2%'}}>
                        <TextField
                        onChange={(event) => {
                            setCommentValue(event.target.value);
                          }} 
                        onKeyUp={(event)=> handleKeyPress(event)}  
                        sx={{background:"white", width:"95%"}} 
                        label="Add Comment"
                        value={commentValue}>
                        </TextField>
                    </Box>
                </div>
            }

            youtubePlayer = 
            <div id="youtube-player">
                <Box>
                    <Button 
                        id='get-player-button'
                        variant="contained"
                        onClick={togglePlayer}
                        sx={{ backgroundColor: (playerComment === "PLAYER") ? '#cb997e' : '#ffe8d6', 
                        color: (playerComment === "PLAYER") ? '#white' : '#cb997e',
                        fontWeight:'bold', fontFamily:'Raleway',
                        '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                            Player
                    </Button>
                    <Button
                        id='get-comments-button'
                        variant="contained"
                        onClick={toggleComment}
                        disabled={(store.currentList.publishedDate === null)}
                        sx={{ backgroundColor: (playerComment === "PLAYER") ? '#ffe8d6' : '#cb997e', 
                        color: (playerComment === "PLAYER") ? '#cb997e' : '#white', 
                        fontWeight:'bold', fontFamily:'Raleway',
                        '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                            Comments
                    </Button>
                    { playerCommentBox }
                </Box>
            </div>
        }  

        if(store.pageView === "HOME") {
            listCard = 
            <div id="list-selector-list"><WorkspaceScreen /></div>;
        }
        else if(store.pageView === "ALL") {
            listCard = 
            <div id="list-selector-list"><AllScreen /></div>;
        }
        else if(store.pageView === "USER") {
            listCard = 
            <div id="list-selector-list"><UserScreen /></div>;
        }
    }

    return (
        <div id="playlist-selector">
            <NavBar />
            <Stack direction="row" spacing={1}>
                { listCard }
                <MUIDeleteModal />
                { youtubePlayer }
            </Stack>
            <Statusbar />
        </div> )
}

export default HomeScreen;
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
                        sx={{ backgroundColor: (playerComment === "PLAYER") ? '#be3d3d' : '#d4d4f5', 
                        color:'white', 
                        '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                            Player
                    </Button>
                    <Button
                        id='get-comments-button'
                        variant="contained"
                        onClick={toggleComment}
                        sx={{ backgroundColor: (playerComment === "PLAYER") ? '#d4d4f5' : '#be3d3d', 
                        color:'white', 
                        '&:hover':{ backgroundColor:'gray', color:'white' } }}>
                            Comments
                    </Button>
                    { playerCommentBox }
                </Box>
            </div>
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
        else if(store.pageView === "USER") {
            listCard = 
            <div id="list-selector-list"> 
                <UserScreen isGuest={false} />
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
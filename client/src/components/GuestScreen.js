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
import TextField from '@mui/material/TextField';

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

    let inputPropsStyle = {style: {fontSize: 15, fontFamily:'Raleway'}}

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
                        disabled={true}
                        sx={{background:"white", width:"95%"}} 
                        label="Login or Register to Add Comments"
                        InputLabelProps={inputPropsStyle}/>
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
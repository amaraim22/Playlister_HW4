import React, { useState } from 'react'
import YouTube from 'react-youtube';

import { FastRewind, Stop, PlayArrow, FastForward } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

function PlaylisterYoutubePlayer(props) {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { currentList } = props;
    const [ currentPlayer, setCurrentPlayer] = useState(null);
    const [ currentSongIndex, setCurrentSongIndex] = useState(0);
    const [ currentSongPlaying, setCurrentSongPlaying] = useState(null);

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];
    for(let i = 0; i < currentList.songs.length; i++) {
        playlist.push(currentList.songs[i].youTubeId);
    }

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    //let currentSongIndex = 0;

    const playerOptions = {
        height: '220',
        width: '420',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSongIndex];
        setCurrentSongPlaying(currentList.songs[currentSongIndex]);
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        if (currentSongIndex < playlist.length - 1) {
            let idx = currentSongIndex + 1;
            setCurrentSongIndex(idx);
        }
        else
            setCurrentSongIndex(playlist.length - 1);
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function decSong() {
        if (currentSongIndex > 0) {
            let idx = currentSongIndex - 1;
            setCurrentSongIndex(idx);
        }
        else
            setCurrentSongIndex(0);
    }

    function onPlayerReady(event) {
        setCurrentPlayer(event.target);
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
            //setCurrentSongPlaying(currentList.songs[currentSongIndex]);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function handleStopPlaying() {
        currentPlayer.pauseVideo();
    }
    function handleStartPlaying() {
        currentPlayer.playVideo();
    }
    function handleNextSong() {
        incSong();
        console.log(currentSongIndex);
        loadAndPlayCurrentSong(currentPlayer);
        handleStartPlaying();
    }
    function handlePrevSong() {
        decSong();
        console.log(currentSongIndex);
        loadAndPlayCurrentSong(currentPlayer);
        handleStartPlaying();
    }

    let playerButtons = 
        <div id="youtube-player-button">
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} >
                <IconButton disabled={!(currentSongIndex >= 0)}>
                    <FastRewind onClick={handlePrevSong} sx={{fontSize:35, color:'black'}}></FastRewind>
                </IconButton>
                <IconButton>
                    <Stop onClick={handleStopPlaying} sx={{fontSize:35, color:'black'}}></Stop>
                </IconButton>
                <IconButton>
                    <PlayArrow onClick={handleStartPlaying} sx={{fontSize:35, color:'black'}}></PlayArrow>
                </IconButton>
                <IconButton disabled={!(currentSongIndex < playlist.length)}>
                    <FastForward onClick={handleNextSong} sx={{fontSize:35, color:'black'}}></FastForward>
                </IconButton>
            </Stack>
        </div>
    let currentSongText = "";
    if (currentSongPlaying) {
        currentSongText =
            <div id="current-song-text">
                <Typography sx={{fontSize:15, textAlign:'center'}}>Playlist: { currentList.name }</Typography>
                <Typography sx={{fontSize:15, textAlign:'center'}}>Song Number: { currentSongIndex + 1 }</Typography>
                <Typography sx={{fontSize:15, textAlign:'center'}}>Title: { currentSongPlaying.title }</Typography>
                <Typography sx={{fontSize:15, textAlign:'center'}}>Artist: { currentSongPlaying.artist }</Typography>
            </div>
    }

    return <div>
            <YouTube
            videoId={playlist[currentSongIndex]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            <div id="youtube-player-text">
                <Typography sx={{paddingTop:1, fontSize:20, textAlign:'center'}}>Now Playing</Typography>
            </div>
            { currentSongText }
            { playerButtons }
        </div>;
}

export default PlaylisterYoutubePlayer;
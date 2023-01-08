import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    borderRadius: '10px',
    borderColor: '#c4c4c4',
    borderWidth: '2px',
    borderStyle: 'solid',
    fontFamily:'Raleway',
    color:'#463f3a'
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    let buttonStyle = { color:"white", fontWeight:'bold', fontFamily:'Raleway', backgroundColor:'#cb997e', 
        '&:hover':{ backgroundColor:'gray' }, margin:1 }

    return (
        <Modal
            open={store.currentSong !== null}
        >
            <Box sx={style}>
            <div className="modal-dialog">
                <header className="dialog-header">
                    Edit Song
                </header>
                <div className="modal-center">
                    <div className="modal-center-content">
                        <Stack direction="row" justifyContent="space-between">
                            <text id="title-prompt" className="modal-prompt">Title:</text>
                            <input 
                                id="edit-song-modal-title-textfield" 
                                className='modal-textfield' 
                                type="text" 
                                defaultValue={title} 
                                onChange={handleUpdateTitle} />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <text id="artist-prompt" className="modal-prompt">Artist:</text>
                            <input 
                                id="edit-song-modal-artist-textfield" 
                                className='modal-textfield' 
                                type="text" 
                                defaultValue={artist} 
                                onChange={handleUpdateArtist} />
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <text id="you-tube-id-prompt" className="modal-prompt">YouTube Id:</text>
                            <input 
                                id="edit-song-modal-youTubeId-textfield" 
                                className='modal-textfield' 
                                type="text" 
                                defaultValue={youTubeId} 
                                onChange={handleUpdateYouTubeId} />
                        </Stack>
                    </div>
                </div>
                <div id="confirm-cancel-container">
                    <Button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleConfirmEditSong}
                        sx={buttonStyle}
                    >Confirm</Button>
                    <Button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCancelEditSong}
                        sx={buttonStyle}
                    >Cancel</Button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}
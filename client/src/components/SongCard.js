import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
    }

    function handleDragLeave(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));

        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleEdit(event) {
        store.showEditSongModal(index, song);
    }

    let cardClass = "list-card unselected-list-card";
    let songCardButton = { background:'transparent', color:'white', '&:hover':{ color:'#463f3a' }, fontSize: 30 }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <div style={{marginTop: '-1.5%', width:'7%', float:'left', fontSize:'60px', fontWeight:'bold'}}><span>{index + 1}</span></div>
            <span style={{fontSize:'25px', fontWeight:'bold'}}>{song.title}</span> <br></br>
            <span style={{fontSize:'20px'}}>{song.artist}</span>
            <DeleteOutline 
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleRemoveSong}
                sx={songCardButton}  />
            <EditOutlined 
                id={"edit-song-" + index}
                className="list-card-button"
                onClick={handleEdit}
                sx={songCardButton}  /> 
        </div>
    );
}

export default SongCard;
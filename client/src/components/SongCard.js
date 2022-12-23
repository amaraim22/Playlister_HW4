import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import RemoveIcon from '@mui/icons-material/Close';

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
    function handleClick(event) {
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
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
            onClick={handleClick}
        >
            {index + 1}. {song.title} by {song.artist} 
            <RemoveIcon 
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleRemoveSong}
                sx={{ marginTop:'-1%', backgroundColor:'#2C2F70', color:'white', '&:hover':{ backgroundColor:'gray' }, fontSize: 40 }}  /> 
        </div>
    );
}

export default SongCard;
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Typography, Card, CardHeader, Stack, CardContent} from '@mui/material';
import {ThumbUpOutlined, ThumbDownOutlined} from '@mui/icons-material';

import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import SongCard from './SongCard.js'
import EditToolbar from './EditToolbar';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { playlist, selected, published, isExpanded, isHome } = props;

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }
    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleDeleteList() {
        store.markListForDeletion(playlist._id);
        store.closeCurrentList();
    }
    function handleDuplicateList() {
        store.duplicatePlaylist(playlist);
    }
    function handlePublishList() {
        store.publishPlaylist(playlist);
    }

    function addLike(){
        if (playlist.likers.includes(auth.user.username)){
            playlist.likers.splice(playlist.likers.indexOf(auth.user.username),1)
            
        }else if (playlist.dislikers.includes(auth.user.username)){
            playlist.likers.push(auth.user.username);
            playlist.dislikers.splice(playlist.dislikers.indexOf(auth.user.username),1)
        }else{
            playlist.likers.push(auth.user.username);
        }
        store.updateCurrentList(playlist)
    }

    function addDislike(){
        if (playlist.dislikers.includes(auth.user.username)){
            playlist.dislikers.splice(playlist.dislikers.indexOf(auth.user.username),1)
            
        }else if (playlist.likers.includes(auth.user.username)){
            playlist.dislikers.push(auth.user.username);
            playlist.likers.splice(playlist.likers.indexOf(auth.user.username),1)
        }else{
            playlist.dislikers.push(auth.user.username);
        }
        store.updateCurrentList(playlist)
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }

    let buttonStyle = { backgroundColor:'#be3d3d', '&:hover':{ backgroundColor:'gray' }, margin:1 }

    let cardContent = "";
    if (isExpanded === true) {
        cardContent =
        <CardContent>
            <Box sx={{ flexGrow: 1 }}>
                <List 
                    id="playlist-cards" 
                    sx={{ width: '100%'}}
                >
                    {
                        playlist.songs.map((song, index) => (
                            <SongCard
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                            />
                        ))  
                    }
                </List>           
            </Box>
            <Box>
                <Box>
                    <Button onClick={handleAddNewSong} 
                    sx={{marginLeft:'3%', width:"94%", backgroundColor:'#be3d3d', '&:hover':{ backgroundColor:'gray' }}}
                    >
                        <AddIcon sx={{color: "white", fontSize: 40}}  /> 
                        <span style={{color:"white"}}>Add New Song</span>
                    </Button>  
                </Box> <br></br>
                <EditToolbar />
                <div id="publish-toolbar">
                    <Button 
                        id='publish-button'
                        onClick={handlePublishList}
                        variant="contained"
                        sx={buttonStyle}>
                            Publish
                    </Button>
                    <Button 
                        id='delete-button'
                        onClick={handleDeleteList}
                        variant="contained"
                        sx={buttonStyle}>
                            Delete
                    </Button>
                    <Button
                        id='duplicate-button'
                        onClick={handleDuplicateList}
                        variant="contained"
                        sx={buttonStyle}>
                            Duplicate
                    </Button>
                </div>
            </Box>
        </CardContent>
    }

    let cardElement =
    <Card 
        key={"listcard-" + playlist._id}
        sx={{width:'100%', backgroundColor:'#fffff1'}}>
        <CardHeader
        onDoubleClick={handleToggleEdit}
        title={playlist.name}
        subheader={"By: " + playlist.ownerUsername}
        >   
        </CardHeader>
        { cardContent }
    </Card>;

    let deleteButton = "";
    if(isHome) {
        deleteButton =
        <Button 
            id='delete-button'
            onClick={handleDeleteList}
            variant="contained"
            sx={buttonStyle}>
                Delete
        </Button>
    }

    if(published === true) {
        let newDate = new Date(playlist.publishedDate);
        let date = newDate.toDateString();
        let numListens = playlist.listens;

        if (isExpanded === true) {
            cardContent =
            <CardContent>
                <Box sx={{ flexGrow: 1 }}>
                    <List 
                        id="playlist-cards" 
                        sx={{ width: '96%', backgroundColor:'#2C2F70', borderRadius:'5px' }}
                    >
                        {
                            playlist.songs.map((song, index) => (
                                <ListItem
                                    key={"list-song-" + index}
                                    sx={{ color:'white', fontSize:20 }}
                                >
                                    {index + 1}. {song.title} by {song.artist}
                                </ListItem>
                            ))  
                        }
                    </List>           
                </Box>
                <Box>
                    <div id="publish-toolbar">
                        { deleteButton }
                        <Button
                            id='duplicate-button'
                            onClick={handleDuplicateList}
                            variant="contained"
                            sx={ buttonStyle }>
                                Duplicate
                        </Button>
                    </div>
                </Box>
            </CardContent>
        }

        cardElement = 
        <Card 
        key={"listcard-" + playlist._id}
        sx={{width:'100%', backgroundColor:'#d4d4f5'}}>
            <CardHeader
            title={playlist.name}
            subheader={"By: " + playlist.ownerUsername}
            action={
                <div id="buttonbox" > 
                    <Stack direction="row" justifyContent="space-between" spacing={2} >
                        <IconButton onClick={addLike}>
                            <ThumbUpOutlined sx={{fontSize:35, 
                            color: ((playlist.likers.includes(auth.user.username))?"#be3d3d":"gray")}}
                            ></ThumbUpOutlined>
                        </IconButton>
                        <Typography sx={{paddingTop:1, fontSize:25}}>{playlist.likers.length}</Typography>
                        <IconButton onClick={addDislike}>
                            <ThumbDownOutlined sx={{fontSize:35,
                            color: ((playlist.dislikers.includes(auth.user.username))?"#be3d3d":"gray")}}
                            ></ThumbDownOutlined>
                        </IconButton>
                        <Typography sx={{paddingTop:1, fontSize:25}}>{playlist.dislikers.length}</Typography>
                    </Stack>
                </div>
            }
            >   
            </CardHeader>
            <Stack direction="row">
                <Typography sx={{margin:'10px', fontSize:15,  marginLeft:'2%'}}>
                    <span style={{fontWeight:'bold'}}>Published: </span> 
                    <span style={{fontStyle: 'italic'}}>{ date }</span>
                </Typography>
                <Typography sx={{margin:'10px', fontSize:15,  marginLeft:'45%'}}>
                    <span style={{fontWeight:'bold'}}>Listens: </span>
                    { numListens }
                </Typography>
            </Stack>
            { cardContent }
        </Card>
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + playlist._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={playlist.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
                sx={{fontSize: '20px'}}
            />
    }
    return (
        cardElement
    );
}

export default ListCard;
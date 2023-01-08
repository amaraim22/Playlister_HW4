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
import EditOutlined from '@mui/icons-material/EditOutlined';
import Tooltip from '@mui/material/Tooltip';

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
    const { playlist, published, isExpanded, isHome  } = props;

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
        store.updateCurrentList(playlist);
        store.closeCurrentList();
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
        store.updateCurrentList(playlist);
        store.closeCurrentList();
    }

    let buttonStyle = { color:"white", fontWeight:'bold', fontFamily:'Raleway', backgroundColor:'#cb997e', 
        '&:hover':{ backgroundColor:'gray' }, margin:1 }

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
                <EditToolbar />
                <div id="publish-toolbar">
                    <Button 
                        id='publish-button'
                        onClick={handleAddNewSong}
                        variant="contained"
                        sx={buttonStyle}>
                        <AddIcon sx={{color: "white", fontSize: 25}}  /> 
                        <span style={{color:"white", fontWeight:'bold', fontFamily:'Raleway'}}>Add New Song</span>
                    </Button>
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
        sx={{width:'100%', backgroundColor:'#f1dca7', color: '#463f3a'}}>
        <CardHeader
        title={playlist.name}
        subheader={"By: " + playlist.ownerUsername}
        action={
            <div id="buttonbox"> 
                <Tooltip title={<span style={{ fontFamily:'Raleway', fontSize:'15px' }}>EDIT NAME</span>} placement="bottom">
                    <IconButton onClick={handleToggleEdit}>
                        <EditOutlined 
                        id={"edit-list-" + playlist._id}
                        className="list-card-button"
                        sx={{ color:'#463f3a', fontSize: 30 }}  /> 
                    </IconButton>
                </Tooltip>
            </div>
        }
        titleTypographyProps={{variant:'h5', fontFamily:'Raleway', fontWeight:'bold'}}
        subheaderTypographyProps={{variant:'h7', fontFamily:'Raleway'}}
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
                        sx={{ width: '99%', backgroundColor:'#6b705c', borderRadius:'5px' }}
                    >
                        {
                            playlist.songs.map((song, index) => (
                                <ListItem
                                    key={"list-song-" + index}
                                    sx={{ color:'white'}}
                                >
                                    <span style={{fontSize:'25px', fontWeight:'bold', marginRight:'1%'}}>{index + 1}</span> 
                                    <span style={{fontSize:'25px', fontWeight:'bold', marginRight:'1%'}}>{song.title}</span> 
                                    <span style={{fontSize:'20px'}}>{song.artist}</span>
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
                            disabled={auth.isGuest}
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
        sx={{width:'100%', backgroundColor:'#a5a58d', color:'#463f3a', fontFamily:'Raleway'}}>
            <CardHeader
            title={playlist.name}
            subheader={"By: " + playlist.ownerUsername}
            action={
                <div id="buttonbox"> 
                    <Stack direction="row" justifyContent="space-between" spacing={2} >
                        <Tooltip title={<span style={{ fontFamily:'Raleway', fontSize:'15px' }}>LIKE</span>} placement="bottom">
                            <IconButton onClick={addLike} disabled={auth.isGuest}>
                                <ThumbUpOutlined sx={{ fontSize:35, 
                                color: (auth.isGuest) ? "gray" : ((playlist.likers.includes(auth.user.username))?'#f1dca7':'#463f3a') }}
                                ></ThumbUpOutlined>
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{paddingTop:1, fontSize:25}}>{playlist.likers.length}</Typography>
                        <Tooltip title={<span style={{ fontFamily:'Raleway', fontSize:'15px' }}>DISLIKE</span>} placement="bottom">
                            <IconButton onClick={addDislike} disabled={auth.isGuest}>
                                <ThumbDownOutlined sx={{fontSize:35,
                                color: (auth.isGuest) ? "gray" : ((playlist.dislikers.includes(auth.user.username))?'#f1dca7':'#463f3a')}}
                                ></ThumbDownOutlined>
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{paddingTop:1, fontSize:25}}>{playlist.dislikers.length}</Typography>
                    </Stack>
                </div>
            }
            titleTypographyProps={{variant:'h5', fontFamily:'Raleway', fontWeight:'bold'}}
            subheaderTypographyProps={{variant:'h7', fontFamily:'Raleway'}}
            >   
            </CardHeader>
            <Stack direction="row" justifyContent="space-between">
                <Typography sx={{margin:'10px', fontSize:15,  marginLeft:'2%'}}>
                    <span style={{fontWeight:'bold', fontFamily:'Raleway'}}>Published: </span> 
                    <span style={{fontStyle: 'italic', fontFamily:'Raleway'}}>{ date }</span>
                </Typography>
                <Typography sx={{margin:'10px', fontSize:15, marginRight:'2%'}}>
                    <span style={{fontWeight:'bold', fontFamily:'Raleway'}}>Listens: </span>
                    <span style={{fontFamily:'Raleway'}}>{ numListens }</span>
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
                inputProps={{style: {fontSize: '25px', fontFamily:'Raleway'}}}
                InputLabelProps={{style: {fontSize: '25px', fontFamily:'Raleway'}}}
                sx={{background:"white"}} 
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;
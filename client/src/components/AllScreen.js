import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function AllScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const [expanded, setExpanded] = useState(false);
    const { isGuest } = props;

    const handleChange = panel => (isExpanded) => {
        console.log(panel);
        setExpanded(isExpanded ? panel : false);
        if (isExpanded === true) {
            store.setCurrentList(panel);
        }
        else
            store.closeCurrentList(); 
    };
    const handleDuplicateList = list => () => {
        console.log(list);
        store.duplicatePlaylist(list);
        store.changePageView("HOME");
    };

    let allLists = [];
    if(store.allPlaylists != null) {
        allLists = store.allPlaylists.filter(pair => pair.publishedDate != null);
    }

    return (
        <List sx={{ width: '98%', left: '1%', bgcolor: '#e0e0e0', overflowY:"scroll" }}>
            {
                allLists.map((pair) => (
                    <Accordion
                    expanded={expanded === pair._id}
                    key={pair._id}
                    onChange={handleChange(pair._id)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                            published={(pair.publishedDate != null)}
                            />
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ flexGrow: 1 }}>
                                <List 
                                    id="playlist-cards" 
                                    sx={{ width: '100%'}}
                                >
                                    {
                                        pair.songs.map((song, index) => (
                                            <ListItem
                                                key={"list-song-" + index}
                                            >
                                                {index + 1}. {song.title} by {song.artist}
                                            </ListItem>
                                        ))  
                                    }
                                </List>            
                            </Box>
                            <Box>
                                <div id="publish-toolbar">
                                    <Button
                                        id='duplicate-button'
                                        onClick={handleDuplicateList(pair)}
                                        variant="contained">
                                            Duplicate
                                    </Button>
                                </div>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    
                ))
            }
        </List>
    )
}

export default AllScreen;
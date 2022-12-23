import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import List from '@mui/material/List';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import ListCard from './ListCard.js'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkspaceScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [expand, setExpanded] = useState(false);

    useEffect(() => {
        store.loadIdNamePairs();
        store.getAllPlaylists();
    }, []);

    const handleChange = (panel, isExpanded) => (event) => {
        event.stopPropagation();
        event.preventDefault();
        setExpanded(isExpanded ? false : panel);
        if (isExpanded === false) {
            store.setCurrentList(panel);
            store.incrementListens(panel);
        }
        else
            store.closeCurrentList(); 
    };

    let modalJSX = "";

    if (store) {
        if (store.isEditSongModalOpen()) {
            modalJSX = <MUIEditSongModal />;
        }
        else if (store.isRemoveSongModalOpen()) {
            modalJSX = <MUIRemoveSongModal />;
        }  
    }

    console.log(store.currentList);

    return (
        <List sx={{ width: '98%', left: '1%', bgcolor: '#e0e0e0', overflowY:"scroll" }}>
        {
            store.idNamePairs.map((pair) => (
                <Accordion
                expanded={expand === pair._id}
                key={pair._id}
                >
                    <AccordionSummary>
                        <ListCard
                        idNamePair={pair}
                        selected={false}
                        published={(pair.publishedDate != null)}
                        isExpanded={(expand === pair._id)}
                        />
                        <Button 
                        onClick={handleChange(pair._id, (expand === pair._id))} 
                        sx={{ '&:hover':{ backgroundColor:'#ffffff'} , 
                            "& .MuiTouchRipple-child": { backgroundColor: `#d3d3d3 !important` }
                        }}
                        >
                            {(expand === pair._id) ? 
                            <ExpandLessIcon sx={{ color:'black' }} /> : 
                            <ExpandMoreIcon sx={{ color:'black' }} />}
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        { modalJSX }
                    </AccordionDetails>
                </Accordion>          
            ))
        }
        </List>
    )
}

export default WorkspaceScreen;
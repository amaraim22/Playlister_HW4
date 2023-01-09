import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import List from '@mui/material/List';
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import ListCard from './ListCard.js'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const WorkspaceScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expand, setExpanded] = useState(false);

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

    console.log(auth.loggedIn);
    console.log(auth.user);
    console.log(store.idNamePairs);

    return (
        <List sx={{ width: '98%', left: '2%', bgcolor: '#ddbea9', overflowY:"scroll", borderRadius:'5px', marginTop:'-0.5%' }}>
        {
            store.idNamePairs.map((pair) => (
                <Accordion
                expanded={expand === pair._id}
                key={pair._id}
                >
                    <AccordionSummary>
                        <ListCard
                        playlist={pair.playlist}
                        published={(pair.playlist.publishedDate != null)}
                        isExpanded={(expand === pair._id)}
                        isHome={(store.pageView === "HOME")}
                        />
                        <Tooltip title={<span style={{ fontFamily:'Raleway', fontSize:'15px' }}>
                            {(expand === pair._id) ? 
                                "CLOSE PLAYLIST" : 
                                "OPEN PLAYLIST"}
                            </span>} placement="bottom">
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
                        </Tooltip>
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
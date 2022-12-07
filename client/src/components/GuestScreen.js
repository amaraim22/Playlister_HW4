import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import AllScreen from './AllScreen'
import NavBar from './NavBar.js';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const GuestScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    //const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.changePageView("ALL");
    }, []);

    let listCard = "";
    //console.log(store.allPlaylists);
    if(store) {
        if(store.pageView === "ALL") {
            //listCard = <AllScreen isGuest={true} />;
        }
    }
    return (
        <div id="playlist-selector">
            <NavBar isGuest={true} />
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default GuestScreen;
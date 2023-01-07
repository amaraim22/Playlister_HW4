import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    SET_PAGE_VIEW: "SET_PAGE_VIEW",
    GET_ALL_PLAYLISTS: "GET_ALL_PLAYLISTS",
    SORT_PLAYLISTS: "SORT_PLAYLISTS",
    CHANGE_FILTER: "CHANGE_FILTER",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        pageView: "HOME",
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        allPlaylists: null,
        filter: "",
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    filter: "",
                }));
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                }));
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    filter: "",
                }));
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pairsArray,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                }));
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.DELETE_LIST,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    filter: "",
                }));
            }
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : null,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: store.allPlaylists,
                    filter: "",
                }));
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                }));
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    filter: "",
                }));
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.EDIT_SONG,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    filter: "",
                }));
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.REMOVE_SONG,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    filter: "",
                }));
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    filter: "",
                }));
            }
            case GlobalStoreActionType.SET_PAGE_VIEW: {
                return setStore((prevState) => ({
                    ...prevState,
                    pageView: payload,
                    currentList: null,
                }));
            }
            case GlobalStoreActionType.GET_ALL_PLAYLISTS: {
                return setStore((prevState) => ({
                    ...prevState,
                    allPlaylists: payload,
                }));
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.SORT_PLAYLISTS: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    allPlaylists: payload.allPlaylists,
                    idNamePairs: payload.pairsArray,
                    pageView: payload.pageView,
                    filter: "",
                }));
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.CHANGE_FILTER: {
                return setStore((prevState) => ({
                    ...prevState,
                    currentModal : CurrentModal.NONE,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    pageView: payload.pageView,
                    filter: payload.string,
                }));
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                                history.push("/");
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();

        history.push("/");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        async function asyncCreateNewList() {
            let newListName = "Untitled" + store.newListCounter;
            const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.username, null, 0, [], [], []);
            console.log("createNewList response: " + response);
            if (response.status === 201) {
                tps.clearAllTransactions();
                let newList = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                }
                );

                // IF IT'S A VALID LIST THEN LET'S START EDITING IT
                store.loadIdNamePairs();
                history.push("/");
            }
            else {
                console.log("API FAILED TO CREATE A NEW LIST");
            }
        }
        asyncCreateNewList();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            let response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: { pairsArray: pairsArray }
                    });
                }
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.getAllPlaylists = function () {
        async function asyncGetAllPlaylists() {
            let response = await api.getPlaylists();
            if (response.data.success) {
                let allLists = response.data.playlists;
                storeReducer({
                    type: GlobalStoreActionType.GET_ALL_PLAYLISTS,
                    payload: allLists
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncGetAllPlaylists();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = async function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                history.push("/");
            }
        }
        await processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    store.unmarkListForDeletion = function() {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
                history.push("/");
            }
        }
        asyncSetCurrentList(id);
    }

    store.publishPlaylist = function (list) {     
        list.publishedDate = new Date();
        async function asyncPublishList() {
            const response = await api.updatePlaylistById(list._id, list);
            if (response.data.success) {
                store.loadIdNamePairs();
            }
        }
        asyncPublishList();
    }

    store.duplicatePlaylist = function (list) {
        async function asyncDuplicatePlaylist() { 
            const response = await api.createPlaylist(list.name + " copy", list.songs, auth.user.email, auth.user.username, null, 0, [], [], []);
            console.log("createNewList response: " + response);
            if (response.status === 201) {
                tps.clearAllTransactions();
                let newList = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: newList
                }
                );

                // IF IT'S A VALID LIST THEN LET'S START EDITING IT
                store.loadIdNamePairs();
            }
        }
        asyncDuplicatePlaylist();
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList(list);
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList(list);
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList(list);
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList(list);
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function(list) {
        async function asyncUpdateCurrentList(list) {
            const response = await api.updatePlaylistById(list._id, list);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: playlist
                });
                store.loadIdNamePairs();
                store.getAllPlaylists();
                history.push("/");
            }
        }
        asyncUpdateCurrentList(list);
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    store.addComment = function(list, newCommentBody) {
        console.log(newCommentBody);
        let newComment = { body: newCommentBody, owner: auth.user.username, postedDate: new Date() };
        list.comments.push(newComment);
        //list.comments = [];
        console.log(list);
        store.updateCurrentList(list);
    }
    store.incrementListens = function(id) {
        async function asyncIncrementListens(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (playlist.publishedDate != null) {
                    playlist.listens += 1;
                    store.updateCurrentList(playlist);
                }
            }
        }
        asyncIncrementListens(id);
    }
    store.changePageView = function (pageType) {
        storeReducer({
            type: GlobalStoreActionType.SET_PAGE_VIEW,
            payload: pageType
        });
    }
    store.changeFilter = function (keyWord, pageView) {
        storeReducer({
            type: GlobalStoreActionType.CHANGE_FILTER,
            payload: { pageView: pageView,
                string: keyWord }
        });
    }
    store.sortPlaylists = function (propType, pageView) {
        if (pageView === "HOME") {
            let pairsArray = store.idNamePairs;
            if (propType === "Sort Name") {
                pairsArray.sort((a,b)=> a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}));  
            }
            else if (propType === "Sort Creation Date") {
                pairsArray.sort(function(a,b){
                    return new Date(a.playlist.createdAt) - new Date(b.playlist.createdAt);
                });                
            } 
            else if (propType === "Sort Last Edit Date") {
                pairsArray.sort(function(a,b){
                    return new Date(b.playlist.updatedAt) - new Date(a.playlist.updatedAt);
                });
            }

            storeReducer({
                type: GlobalStoreActionType.SORT_PLAYLISTS,
                payload: { pairsArray: pairsArray,
                            pageView: pageView,
                            allPlaylists: store.allPlaylists }
            });
        }
        else if (pageView === "ALL" || pageView === "USER") {
            let allLists = store.allPlaylists;
            if (propType === "Sort Name") {
                allLists.sort((a,b)=> a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}));
            }
            else if (propType === "Sort Publish Date") {
                allLists.sort(function(a,b){
                    return new Date(b.playlist.publishedDate) - new Date(a.playlist.publishedDate);
                });
            }
            else if (propType === "Sort Listens") {
                allLists.sort(function(a,b){
                    return b.playlist.listens - a.playlist.listens;
                });
            }
            else if (propType === "Sort Likes") {
                allLists.sort(function(a,b){
                    return b.playlist.likers.length - a.playlist.likers.length;
                });
            }
            else if (propType === "Sort Dislikes") {
                allLists.sort(function(a,b){
                    return b.playlist.dislikers.length - a.playlist.dislikers.length;
                });
            }

            storeReducer({
                type: GlobalStoreActionType.SORT_PLAYLISTS,
               payload: { pairsArray: store.idNamePairs,
                   pageView: pageView,
                  allPlaylists: allLists }
           });
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
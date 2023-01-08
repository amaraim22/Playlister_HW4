
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

// mongoose
//     .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
//     .catch(e => {
//         console.error('Connection error', e.message)
//     })

mongoose
    .connect("mongodb+srv://amaraim22:Holland@2013@playlists.xaiclwh.mongodb.net/playlists?retryWrites=true&w=majority", 
        { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db


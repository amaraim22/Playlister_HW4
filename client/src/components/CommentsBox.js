import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

export default function CommentsBox() {
  const { store } = useContext(GlobalStoreContext);

  let comments = store.currentList.comments;
  comments.sort(function(a,b){
    return new Date(b.postedDate) - new Date(a.postedDate);
  });
  console.log(comments);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ overflowY:'scroll' }}>
        <List sx={{ height: 350, mb: 2 }}>
          {comments.map(({ body, owner }) => (
            <React.Fragment>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture"> {owner.substring(0, 1)} </Avatar>
                </ListItemAvatar>
                <ListItemText primary={owner} secondary={body}/>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
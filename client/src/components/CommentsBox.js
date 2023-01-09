import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';

export default function CommentsBox() {
  const { store } = useContext(GlobalStoreContext);

  let comments = store.currentList.comments;
  comments.sort(function(a,b){
    return new Date(b.postedDate) - new Date(a.postedDate);
  });

  let commentItems = 
  <List sx={{ height: 435, mb: 2, backgroundColor:'#ffe8d6'}}>
      <React.Fragment>
        <ListItem sx={{backgroundColor:'white', borderRadius:'10px', mb:'5px', width:'99%'}}>
          <ListItemText 
            primary={
            <Stack justifyContent="center">
              <Typography type="body2" sx={{ fontFamily:'Raleway', fontWeight:'bold', color:'#463f3a' }}>No comments q.q</Typography>
            </Stack>}/>
        </ListItem>
      </React.Fragment>
  </List>
  
  if(comments.length !== 0) {
    commentItems = 
    <List sx={{ height: 435, mb: 2, backgroundColor:'#ffe8d6'}}>
      {comments.map(({ body, owner, postedDate }) => (
        <React.Fragment>
          <ListItem sx={{backgroundColor:'white', borderRadius:'10px', mb:'5px', width:'99%'}}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" sx={{backgroundColor:'#6b705c'}}> {owner.substring(0, 1)} </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={
              <Stack direction="row" justifyContent="space-between">
                <Typography type="body2" sx={{ fontFamily:'Raleway', fontWeight:'bold', color:'#463f3a' }}>{owner}</Typography>
                <Typography type="body2" sx={{ fontFamily:'Raleway', fontStyle:'italic', color:'#463f3a', fontSize:'15px' }}>{new Date(postedDate).toLocaleString()}</Typography>
              </Stack>} 
              secondary={<Typography type="body2" sx={{ fontFamily:'Raleway', color:'#463f3a' }}>{body}</Typography>}/>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  }

  

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ overflowY:'scroll', backgroundColor:'#ffe8d6' }}>
        { commentItems }
      </Paper>
    </React.Fragment>
  );
}
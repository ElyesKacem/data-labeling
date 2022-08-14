import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';

const AccountsCard = (props) => {
  console.log('hiiiii')
  console.log(props)
  return (
    <div>
      
      <Paper elevation={3} style={{width:400,paddingTop:0,paddingBottom:20,paddingLeft:30}} >
        {/* <div style={{display:'flex',justifyContent:'space-between',padding:10,alignItems:'center'}}>

        <Avatar>H</Avatar>

        <div>
          name: test
        </div>
          
        </div> */}

<br />
<Grid container 
direction="row"
// justifyContent="center"
alignItems="center"
spacing={4}
>

<Grid item>
<Avatar sx={{ width: 56, height: 56 ,fontSize:25}}>FE</Avatar>
</Grid>
<Grid item>
  <b>  First name :  </b> {props.data.firstName} <br />
  <b> Last name </b>: {props.data.lastName} <br />

<b> Email </b>: {props.data.username}

</Grid>

</Grid>


      </Paper>
    
    </div>
  )
}

export default AccountsCard
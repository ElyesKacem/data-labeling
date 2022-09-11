import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';

const AccountsCard = (props) => {
  function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);
  
    return color;
  }

  return (
    <div>

      <Paper elevation={3} style={{ width: 400, paddingTop: 0, paddingBottom: 20, paddingLeft: 30 }} >


        <br />
        <Grid container
          direction="row"
          // justifyContent="center"
          alignItems="center"
          spacing={4}
        >

          <Grid item>
            <Avatar style={{backgroundColor:randomColor()}} sx={{ width: 56, height: 56, fontSize: 25 }}>{props.data.firstName[0].toUpperCase()}{props.data.lastName[0].toUpperCase()}</Avatar>
          </Grid>
          <Grid item>
            <b>  First name :  </b> {props.data.firstName} <br />
            <b> Last name </b>: {props.data.lastName} <br />

            <b> Username </b>: {props.data.username}

          </Grid>

        </Grid>


      </Paper>

    </div>
  )
}

export default AccountsCard
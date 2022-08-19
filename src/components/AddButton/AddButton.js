import React from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';

export default function AddButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style={{ textTransform: 'none', backgroundColor: '#38a728' }} variant="contained" startIcon={<AddOutlinedIcon />} onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write down the necessary informations.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
          /> <br />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            type="project"
            fullWidth
            variant="standard"
          /> <br />
          <FormLabel id="Title">Select the role</FormLabel><br />
          <RadioGroup
   
    defaultValue="TTS"
    name="radio-buttons-group" required
  >
    <FormControlLabel value="Supervisor" control={<Radio />} label="Supervisor" />
    <FormControlLabel value="Validator" control={<Radio />} label="Other" />
    <FormControlLabel value="Normal user" control={<Radio />} label="Normal user" />
  </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

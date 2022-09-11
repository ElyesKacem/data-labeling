import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import SignUp from '../../pages/SignUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddAccountButton() {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handeCloseAlert = () =>{
setSuccess(false);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        + Create new account
      </Button>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open success snackbar
      </Button> */}
      <Snackbar open={success} autoHideDuration={5000} onClose={handeCloseAlert}>
        <Alert onClose={handeCloseAlert} severity="success" sx={{ width: '100%' }}>
          Success !
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <SignUp success={success}
        setSuccess={setSuccess}
        setOpen={setOpen} />
      </Dialog>
    </div>
  );
}

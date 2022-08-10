import React from 'react'
import { Container, Grid } from '@mui/material';
import MediaCard from './media cards/mediacard';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HorizontalLinearStepper from './Stepper/Stepper';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ProjectsList = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openP, setOpenP] = React.useState(false);
    const handleClose = () => {
        setOpenP(false);
    };
    const handleClickOpen = () => {
        setOpenP(true);
    };
    return (
        <Container>
            <Button
                onClick={handleClickOpen}
                style={{ textTransform: 'none', backgroundColor: '#38a728' }} variant="contained" startIcon={<AddOutlinedIcon />}>
                Create new project
            </Button> <br /> <br />
            <Dialog
                fullScreen={fullScreen}
                open={openP}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle id="responsive-dialog-title">
                    {"Create a new project"}
                </DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                    <HorizontalLinearStepper />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
                <Grid item xs={3}>
                    <MediaCard />
                </Grid>
            </Grid>
        </Container>
    )
}
export default ProjectsList
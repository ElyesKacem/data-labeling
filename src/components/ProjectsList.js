import React from 'react'
import { useEffect } from 'react';
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
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const PROJECTS_URL = "/project"

const ProjectsList = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openP, setOpenP] = React.useState(false);

    const [projects, setProjects] = React.useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClose = () => {
        setOpenP(false);
    };
    const handleClickOpen = () => {
        setOpenP(true);
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getProjects = async () => {
            try {
                const response = await axiosPrivate.get(PROJECTS_URL, {
                    signal: controller.signal
                });
                console.log('get all projects response', response.data);
                isMounted && setProjects(response.data);
            } catch (error) {
                console.error(error);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getProjects();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
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
                        Please fill all the necessary informations to create a new project. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </DialogContentText>
                    <HorizontalLinearStepper />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button> */}
                </DialogActions>
            </Dialog>
            <Grid container spacing={3}>
                {projects?.length
                    ? (
                        projects.map((data) => (
                            <Grid item xs={3}>
                                {data._id}
                                <MediaCard projecttitle={data.title} projectid={data._id} />
                            </Grid>
                        ))
                    ) :
                    <p>no users exists</p>
                }
            </Grid>
        </Container>
    )
}
export default ProjectsList;
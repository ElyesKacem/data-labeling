import React from 'react'
import { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import HorizontalLinearStepper from './Stepper/Stepper';
import {  useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import ProjectCard from './ProjectCard/ProjectCard';

const ProjectsList = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openP, setOpenP] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const { auth } = useAuth();
    const [projectIdToDelete, setProjectIdToDelete] = React.useState();
    
    
    const id = auth.id
    

    const PROJECTS_URL = `users/${id}/projects`;
    

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
                
                isMounted && setProjects(response.data);
                setLoading(false);
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

    React.useEffect(() => {
      //filter
      if(projectIdToDelete){

          setProjects(projects.filter((line)=>
            line.project._id!==projectIdToDelete
          ));
      }
    
        
    }, [projectIdToDelete])
    
    return (
        <>
            {(auth.supervisor || auth.admin) && <div>
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
            </div>}
            <Grid container spacing={3}>
                {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", marginTop: 100 }}>
                    <CircularProgress />
                </div>}
                {projects?.length
                    ? (
                        projects.map((data, index) => (
                            <Grid key={index} item >
                                <ProjectCard data={data} project={data.project} projectTitle={data.project.title} role={data.role} projectId={data.project._id} setProjectIdToDelete={setProjectIdToDelete} />
                            </Grid>
                        ))
                    ) :
                    <div>
                        {!loading && <div>
                            <br />
                            <br />
                            <p>There are no projects.</p>
                        </div>}
                    </div>
                }
            </Grid>
        </>
    )
}
export default ProjectsList;
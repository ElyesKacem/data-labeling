import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from '@mui/material/Button';

import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserLine from '../UserLine/UserLine';
import FileUpload from 'react-mui-fileuploader';
import { FormControl } from '@mui/material';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function ProjectCard(props) {

    const [loading, setLoading] = React.useState(true);
    const [projectFiles, setProjectFiles] = React.useState([]);
    const [users, setUsers] = React.useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    React.useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getProjects = async () => {
            try {
                const response = await axiosPrivate.get("/project/users", {
                    params: { projecID: props.projectId },
                    signal: controller.signal
                });
                // console.log('get all projects response testtttttttttttttttttttttttt', response.data.collabs);
                isMounted && setUsers(response.data.collabs);
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
    }, []);
    const exportfiles = () => {
        const exportProject = async () => {
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.get("/project/export", {
                    params: { projecID: props.projectId },
                    signal: controller.signal
                });
                console.log('get all projects response testtttttttttttttttttttttttt', response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        exportProject();
    }
    const [addingCollabsState, setAddingCollabsState] = React.useState(false);
    const [addingFilesState, setAddingFilesState] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedUsers, setSelectedUsers] = React.useState([])
    const anchorRef = React.useRef(null);

    const handleMenuItemClickFiles = (event, projectId) => {
        event.preventDefault();

        setOpenDialog(true);
        setAddingFilesState(true);
    };
    const handleMenuItemClickCollabs = (event, projectId) => {
        event.preventDefault();
        setAddingCollabsState(true);
        setOpenDialog(true);
    };

    const handleMenuItemClick = (event, index) => {
        console.log("whaaaaaaaaaaaaaat");
    };

    const handleToggle = (event) => {
        event.preventDefault();
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const handleCloseDialog = () => {
        setAddingCollabsState(false);
        setAddingFilesState(false);

        setOpenDialog(false);
    };

    const handleFilesChange = async (files) => {

        await setProjectFiles(files);

    }
    const PROJECT_DELTE_URL = "/project"
    const DeleteProject = (event, index) => {
        event.preventDefault();
        const controller = new AbortController();
        const deleteproject = async () => {
            try {
                const response = await axiosPrivate.delete(PROJECT_DELTE_URL, {
                    params: { projectID: props.projectId },
                    signal: controller.signal
                });
                console.log('delete project response', response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        deleteproject();
        setOpen(false);
    };

    return (
        <>
            <Dialog open={openDialog} onClick={(e) => {

            }} onClose={handleCloseDialog}>
                {addingFilesState &&
                    <React.Fragment>
                        <DialogTitle>Adding files</DialogTitle>
                        <DialogContent>
                            <p>Please select files to add</p>
                            <br />
                            <FormControl>

                                <FileUpload
                                    multiFile={true}
                                    disabled={false}
                                    title={"Choice the file"}
                                    header="Drag to drop"
                                    leftLabel="or"
                                    rightLabel="to select files"
                                    buttonLabel="click here"
                                    buttonRemoveLabel="Remove all"
                                    // defaultFiles={defaultf}
                                    // maxFileSize={50}
                                    maxUploadFiles={0}
                                    // maxFilesContainerHeight={357}
                                    errorSizeMessage={'fill it or move it to use the default error message'}
                                    // allowedExtensions={['jpg', 'jpeg', 'png']}
                                    onFilesChange={handleFilesChange}
                                    //onError={handleFileUploadError}
                                    // imageSrc={'path/to/custom/image'}
                                    bannerProps={{ elevation: 0, variant: "outlined" }}
                                    containerProps={{ elevation: 0, variant: "outlined" }}
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleCloseDialog}>Add</Button>
                        </DialogActions>
                    </React.Fragment>}


                {addingCollabsState &&
                    <React.Fragment>
                        <DialogTitle>Adding Collabs</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please select users to add :
                            </DialogContentText>
                            <UserLine selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleCloseDialog}>Add</Button>
                        </DialogActions>
                    </React.Fragment>}
            </Dialog>
            <Link style={{ textDecoration: 'none' }} to={"/project/" + props.data.project._id + "/" + props.data.role}>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <Typography variant="h5" sx={{ mb: 1 }} component="span">
                                {props.data.project.title}
                            </Typography>
                            <React.Fragment>
                                <ButtonGroup ref={anchorRef} variant="text">
                                    <Button
                                        size="small"
                                        aria-controls={open ? 'split-button-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-label="select merge strategy"
                                        aria-haspopup="menu"
                                        onClick={handleToggle}
                                    >
                                        <MoreHorizIcon />
                                    </Button>
                                </ButtonGroup>

                                <Popper
                                    sx={{
                                        zIndex: 1,
                                    }}
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>

                                                        <MenuItem onClick={(event) => handleMenuItemClickFiles(event)}>
                                                            add files
                                                        </MenuItem>
                                                        <MenuItem onClick={(event) => handleMenuItemClickCollabs(event)}>
                                                            add collabs
                                                        </MenuItem>
                                                        <MenuItem
                                                            onClick={(event) => DeleteProject(event)}
                                                        >
                                                            Remove
                                                        </MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </React.Fragment>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <Typography color="text.secondary">
                                    {props.data.project.type}
                                </Typography>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                    <Typography variant="body2" component="div">
                                        {props.data.project.nv}
                                    </Typography>&nbsp; <DoneIcon style={{ width: 20, height: 20, color: 'green' }} />
                                    <Divider orientation="vertical" flexItem sx={{
                                        mx: 'auto',
                                        mr: 1,
                                        ml: 1
                                    }} />
                                    <Typography variant="body2" component="div">
                                        {props.data.project.na}
                                    </Typography>&nbsp; <EditIcon style={{ width: 20, height: 20, color: '#d95d5d' }} />
                                    <Divider orientation="vertical" flexItem sx={{
                                        mx: 'auto',
                                        mr: 1,
                                        ml: 1
                                    }} />
                                    <Typography variant="body2" component="div">
                                        {props.data.project.nf}
                                    </Typography>&nbsp; <InsertDriveFileIcon style={{ width: 20, height: 20, color: '#005ce5' }} />
                                </div>
                            </div>
                        </div>
                        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
                    </CardContent>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <CardActions style={{ color: 'grey' }}>
                            {props.data.role}
                        </CardActions>



                        <AvatarGroup max={4} sx={{
                            '& .MuiAvatar-root': { width: 27, height: 27, fontSize: 15 },
                        }}>
                            {users?.length
                                ? (
                                    users.map((user, index) => <Avatar key={index} sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>{user.user.firstName[0].toUpperCase()}{user.user.lastName[0].toUpperCase()}</Avatar>)
                                ) :
                                <p>There are users.</p>
                            }

                        </AvatarGroup>

                    </div>
                </Card>
            </Link >
        </>
    );
}

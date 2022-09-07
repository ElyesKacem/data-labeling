import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
                console.log('get all projects response testtttttttttttttttttttttttt', response.data.collabs);
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

    return (
        <Link style={{ textDecoration: 'none' }} to={"/project/" + props.data.project._id + "/" + props.data.role}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h7" sx={{ mb: 1, mr: 1, ml: 1 }} component="span">
                        {props.data.project.title}
                    </Typography>
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
                                    {props.data.project.files.length}
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
                                users.map(user => <Avatar sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>{user.user.firstName[0].toUpperCase()}{user.user.lastName[0].toUpperCase()}</Avatar>)
                            ) :
                            <p>There are users.</p>
                        }

                    </AvatarGroup>
                </div>
            </Card>
        </Link>
    );
}

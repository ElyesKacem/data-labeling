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
import { Link } from 'react-router-dom';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function ProjectCard(props) {
    
    
    return (
        <Link style={{ textDecoration: 'none' }} to={"/project/"+props.data.project._id +"/"+props.data.role}>
        
        <Card sx={{ minWidth: 275 }}>
            <CardContent>

                <Typography variant="h5" sx={{ mb: 1 }} component="div">
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
                <Typography variant="body2"  component="div">
                    0
                </Typography>&nbsp; <DoneIcon style={{width:20,height:20,color:'green'}} />
                <Typography variant="body2"  component="div">
                    0
                </Typography>&nbsp; <EditIcon style={{width:20,height:20,color:'#d95d5d'}} />
                        <Typography variant="body2"  component="div">
                    {props.data.project.files.length}
                </Typography>&nbsp; <InsertDriveFileIcon style={{width:20,height:20,color:'#005ce5'}}  />
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
                    <Avatar sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>DE</Avatar>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>DE</Avatar>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>DE</Avatar>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>DE</Avatar>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>DE</Avatar>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 15, backgroundColor: '#f5f5f5', color: '#a7a7a7', fontWeight: 'bold' }}>DE</Avatar>

                </AvatarGroup>
            </div>
        </Card>
        </Link>
    );
}

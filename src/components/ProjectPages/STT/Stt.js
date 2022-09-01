import React, { useEffect, useState } from 'react'
import AudioPlayer from '../../AudioPlayer/AudioPlayer'

import TextField from '@mui/material/TextField';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Waveform from "./Waveform";
import SoundPrint from './soundPrint';
import BasicTable from './table';import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';



const PROJECT_URL = "/project"

const Stt = () => {
  const { projectId } = useParams();

  const [files, setfiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(PROJECT_URL + "/" + projectId, {
          params: { id: projectId },
          signal: controller.signal
        });
        console.log('get project response', response.data);
        isMounted && setfiles(response.data.files);
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])
  
  useEffect(() => {
    console.log('files',files);
  
    return () => {
      
    }
  }, [files]);
  
  return (


<Grid container spacing={4}>

  <Grid item xs={6}>
  <BasicTable data={files}/>
  </Grid>
  <Grid item xs={6}>
<h3>Audio :</h3>
<SoundPrint url="https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3"></SoundPrint>
<h3>Write the topic :</h3>
<TextField id="outlined-basic" label="Topic" variant="outlined" />
<br />
<br />
<Button variant="contained">Submit</Button>
  </Grid>

</Grid>
   
  )
}

export default Stt
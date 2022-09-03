import React, { useEffect, useState } from 'react'
import AudioPlayer from '../../AudioPlayer/AudioPlayer'

import TextField from '@mui/material/TextField';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Waveform from "./Waveform";
import SoundPrint from './soundPrint';
import BasicTable from './table'; import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';



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
    console.log('files', files);

    return () => {

    }
  }, [files]);

  return (


    <Grid container spacing={4}>

      <Grid item xs={6}>
        <BasicTable selectedFile={selectedFile} setSelectedFile={setSelectedFile} data={files} />
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ padding: 20, paddingTop: 1 }}>


          {selectedFile && <>

            <h3>Audio :</h3> {selectedFile.name}
            <SoundPrint url={selectedFile.path}></SoundPrint>
            <h3>Write the topic :</h3>
            <TextField fullWidth multiline id="outlined-basic" label="Topic" variant="outlined" />
            <br />
            <br />
            <Button variant="contained" onClick={() => {
              const controller = new AbortController();
              const updatefiles = async () => {
                try {
                  const response = await axiosPrivate.put("/project",
                    JSON.stringify({ projectId, fileId: selectedFile._id, annotation: "standard" }),
                    {
                      signal: controller.signal
                    });
                  console.log(response);
                } catch (error) {
                  console.error(error);
                  navigate('/login', { state: { from: location }, replace: true })
                }

              }
              updatefiles();
            }}
            >Submit</Button>
          </>}
          {!selectedFile && <>

            <div>
              <h1>Please select the audio file to work in</h1>
            </div>
          </>}
        </Paper>
      </Grid>

    </Grid>

  )
}

export default Stt
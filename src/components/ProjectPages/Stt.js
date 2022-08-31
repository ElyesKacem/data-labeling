import React, { useEffect, useState } from 'react'
import AudioPlayer from '../AudioPlayer/AudioPlayer'

import TextField from '@mui/material/TextField';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const PROJECT_URL = "/project"

const Stt = () => {
  const { projectId } = useParams();

  const [files, setfiles] = useState();
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
  return (



    <div>

      {files?.length
        ? (
          files.map((file) => (
            <>
              <AudioPlayer file={file.path}/>
              {console.log("file in stt ",file)}
              <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                maxRows={4}
              //value={value}
              //onChange={handleChange}
              />
            </>
          ))
        ) :
        <p>no files exists</p>
      }
    </div>
  )
}

export default Stt
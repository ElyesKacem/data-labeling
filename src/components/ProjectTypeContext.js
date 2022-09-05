import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Stt from './ProjectPages/STT/Stt';
import Tts from './ProjectPages/TTS/Tts';
const PROJECT_URL = "/project"

const ProjectTypeContext = () => {
    console.log("im here");
    const { projectId } = useParams();
    const [type, setType] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

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
            isMounted && setType(response.data.type);
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
        type === "STT" && <Stt />
        ||
        type === "TTS" && <Tts />
    )
}

export default ProjectTypeContext
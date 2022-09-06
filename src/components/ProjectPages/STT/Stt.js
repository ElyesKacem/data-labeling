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
import Alert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';




const PROJECT_URL = "/project"

const Stt = () => {
  const { projectId } = useParams();
  const { userRole } = useParams();

  const [files, setFiles] = useState([]);

  // const [userRole, setUserRole] = useState();

  // alert settings
  const [open, setOpen] = React.useState(false);

  const { auth } = useAuth();

  const [annotationValue, setAnnotationValue] = useState("");
  const [correctingAnnotation, setCorrectingAnnotation] = useState('');

  const [selectedFile, setSelectedFile] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // define funcitons
 
  const annotateProject = () =>{
    if (annotationValue === "") {
      setOpen(true);
    }
    else {
      setOpen(false);

      const controller = new AbortController();
      const annotateFile = async () => {
        try {
          const response = await axiosPrivate.put("/project",
            JSON.stringify({
              projectId,
              fileId: selectedFile._id,
              annotation: annotationValue,
              annotatedBy: auth.user,
              selectedFileId: selectedFile.id
            }),
            {
              signal: controller.signal
            });
          console.log(response.data);
          console.log(response.data.state);
          if (response.data.state === 'success') {


            setSelectedFile({
              ...selectedFile, annotation: annotationValue,
              annotatedBy: auth.user,
              annotatedOn: (new Date()).toLocaleDateString()+" at "+(new Date()).toLocaleTimeString()
            })

            var updatedFileList = [...files];

            let index = -1
            updatedFileList.forEach(function (value, i) {
              if (value._id === selectedFile._id) {
                index = i;

              }

            });

            const obj = {
              ...selectedFile, annotation: annotationValue,
              annotatedBy: auth.user,
              annotatedOn: (new Date()).toLocaleDateString()+" at "+(new Date()).toLocaleTimeString()
            }
            updatedFileList[index] = obj;


            setFiles(updatedFileList);

          }
        } catch (error) {
          console.error(error);
          navigate('/login', { state: { from: location }, replace: true })
        }

      }
      annotateFile();
    }
  

  }

  const validateProject = () =>{
    const controller = new AbortController();
    const validateFile = async () => {
      try {
        let obj={
            projectId,
            fileId: selectedFile._id,
            validation:correctingAnnotation,
            validatedBy: auth.user,
            selectedFileId: selectedFile.id
          }
        
        const response = await axiosPrivate.put("/project",
          JSON.stringify(obj),
          {
            signal: controller.signal
          });
        if (response.data.state === 'success') {


          setSelectedFile({
            ...selectedFile, validation:correctingAnnotation,
            validatedBy: auth.user,
            validatedOn: (new Date()).toLocaleDateString()+" at "+(new Date()).toLocaleTimeString()
          })

          var updatedFileList = [...files];

          let index = -1
          updatedFileList.forEach(function (value, i) {
            if (value._id === selectedFile._id) {
              index = i;

            }

          });

          const obj = {
            ...selectedFile, annotation: annotationValue,
            validatedBy: auth.user,
            validatedOn: (new Date()).toLocaleDateString()+" at "+(new Date()).toLocaleTimeString()
          }
          updatedFileList[index] = obj;


          setFiles(updatedFileList);

        }
      } catch (error) {
        console.error(error);
        navigate('/login', { state: { from: location }, replace: true })
      }

    }
    validateFile();
  }

  useEffect(() => {
    console.log("user role : ", userRole);
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(PROJECT_URL + "/" + projectId, {
          params: { id: projectId },
          signal: controller.signal
        });
        console.log('get project response', response.data);
        isMounted && setFiles(response.data.files);
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

  }, [files]);

  return (


    <Grid container spacing={4}>
      

      <Grid item xs={6}>
        <BasicTable selectedFile={selectedFile} setSelectedFile={setSelectedFile} data={files} />
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ padding: 20, paddingTop: 1 }}>
        {!selectedFile && <>

<div>
  <h1>Please select the audio file to work in</h1>
</div>
</>}

          {selectedFile && <>
            <h3>Audio :</h3> {selectedFile.name}
            <SoundPrint url={selectedFile.path}></SoundPrint>
            {(!selectedFile.annotation && (userRole==="supervisor" ||  userRole==="Annotator")) &&<h3>Write the topic :</h3>}
            {selectedFile.annotation && <React.Fragment>
              <h3>The topic : </h3>
              <p> {selectedFile.annotation}</p>



            </React.Fragment>}
            {(!selectedFile.annotation && (userRole==="supervisor" ||  userRole==="Annotator")) &&  <React.Fragment>
              <TextField fullWidth multiline id="outlined-basic" label="Topic" variant="outlined" onChange={(e) => { setAnnotationValue(e.target.value) }} />
              <br />
              <br />
              {open && <Alert severity="error" onClose={() => { setOpen(false) }}>Please write the topic !</Alert>}
              <br />


              <Button variant="contained" onClick={() => {annotateProject();}}
              >Submit</Button>

            </React.Fragment>


            }
          </>}
          
          {( selectedFile?.annotation && !selectedFile?.validation && (userRole==="supervisor" ||  userRole==="Validator")) && <div>
          <TextField fullWidth multiline label="Correct if it's false" variant="outlined" onChange={(e) => { setCorrectingAnnotation(e.target.value) }} /> <br /> <br />
          <Button variant="contained" color="success" onClick={()=>{
            validateProject();
          }}>Validate</Button>
            </div>}

            {selectedFile?.validation!=="" && selectedFile?.annotation && <div>
              <b style={{color:'green'}}>Correction : </b> {selectedFile?.validation}
              </div>}
        </Paper>
      </Grid>

    </Grid>

  )
}

export default Stt
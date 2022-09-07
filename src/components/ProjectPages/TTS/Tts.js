import React, { useEffect, useState } from 'react'
import AudioPlayer from '../../AudioPlayer/AudioPlayer'
import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import BasicTable from './table'; import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';
import FileViewer from "react-file-viewer";
import SoundPrint from '../STT/soundPrint';





const PROJECT_URL = "/project"

const Tts = () => {

    const { projectId } = useParams();
    const { userRole } = useParams();

    const [files, setFiles] = useState([]);

    // alert settings
    const [open, setOpen] = React.useState(false);

    const { auth } = useAuth();

    const [annotationVocal, setAnnotationVocal] = useState();
    
    const [correctingAnnotationVocal, setCorrectingAnnotationVocal] = useState();

    const [selectedFile, setSelectedFile] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    const annotateProject = () => {
        // console.log('annotationVocal hereeeeeeeeeeeeee',annotationVocal);
        if (!annotationVocal) {
            setOpen(true);
        }
        else {
            setOpen(false);
            // console.log('annotationVocal',annotationVocal);

            const controller = new AbortController();
            const annotateFile = async () => {
                try {
                    const response = await axiosPrivate.put("/project",
                        JSON.stringify({
                            projectId,
                            fileId: selectedFile._id,
                            annotationVocal: annotationVocal,
                            annotatedBy: auth.user,
                            selectedFileId: selectedFile.id
                        }),
                        {
                            signal: controller.signal
                        });
                    console.log('response.data',response.data);
                    console.log(response.data.state);
                    if (response.data.state === 'success') {


                        setSelectedFile({
                            ...selectedFile, annotationVocal: annotationVocal,
                            annotatedBy: auth.user,
                            annotatedOn: (new Date()).toLocaleDateString() + " at " + (new Date()).toLocaleTimeString()
                        })

                        var updatedFileList = [...files];

                        let index = -1
                        updatedFileList.forEach(function (value, i) {
                            if (value._id === selectedFile._id) {
                                index = i;

                            }

                        });

                        const obj = {
                            ...selectedFile, annotationVocal: annotationVocal,
                            annotatedBy: auth.user,
                            annotatedOn: (new Date()).toLocaleDateString() + " at " + (new Date()).toLocaleTimeString()
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

    const validateProject = () => {
        const controller = new AbortController();
        const validateFile = async () => {
            try {
                let validationVocalCorrection=correctingAnnotationVocal;
                if(!correctingAnnotationVocal){
                    validationVocalCorrection=selectedFile.annotationVocal;

                }
                let obj = {
                    projectId,
                    fileId: selectedFile._id,
                    validationVocal: validationVocalCorrection,
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
                        ...selectedFile, validationVocal: validationVocalCorrection,
                        validatedBy: auth.user,
                        validatedOn: (new Date()).toLocaleDateString() + " at " + (new Date()).toLocaleTimeString()
                    })

                    var updatedFileList = [...files];

                    let index = -1
                    updatedFileList.forEach(function (value, i) {
                        if (value._id === selectedFile._id) {
                            index = i;

                        }

                    });

                    const obj = {
                        ...selectedFile, annotation: annotationVocal,
                        validatedBy: auth.user,
                        validatedOn: (new Date()).toLocaleDateString() + " at " + (new Date()).toLocaleTimeString()
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
    const [audioDetails, setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: 0,
            m: 0,
            s: 0
        }
    })

    const handleAudioStop = async (data) => {
        console.log('data',data)
        setAudioDetails(data);
        getBase64(data.blob).then(result =>{
            // console.log('result',result);
            setAnnotationVocal(result);
           })
    }
    
    const handleAudioStopCorrection = async (data) => {
        console.log('data',data)
        setAudioDetails(data);
        getBase64(data.blob).then(result =>{
            // console.log('result',result);
            setCorrectingAnnotationVocal(result);
           })
    }

    const handleAudioUpload = (file) => {
        console.log(file);
    }

    const handleCountDown = (data) => {
        // console.log(data);
    }

    const handleReset = () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
            }
        };
        setAudioDetails(reset);
    }
    // console.log(audioDetails);
    const [text,setText] = useState();

    const getText = (path) =>{
        var formatPath=path.split(',')[1];
        var textValue= atob(formatPath);
        return textValue
    }

    useEffect(() => {
      console.log(selectedFile);
    if(selectedFile?.contentType==='text/plain'){

        var content=selectedFile.path.split(',')[1];
        // console.log(atob(content))
        setText(atob(content));
    }
    }, [selectedFile])

   const getBase64 = (file) => {
    console.log('file',file);
        return new Promise(resolve => {
          
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            // console.log("Called", reader);
            let baseURL = reader.result;
            // console.log('baseURL',baseURL);
            resolve(baseURL);
          };
      
        });
      };
    
    return (
        <div>this is tts page (work in progress)
            <Grid container spacing={4}>


                <Grid item xs={6}>
                    <BasicTable text={text} setText={setText} selectedFile={selectedFile} setSelectedFile={setSelectedFile} data={files} />
                    
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: 20, paddingTop: 1 }}>
                        {!selectedFile && <>

                            <div>
                                <h1>Please select the text file to work in</h1>
                                
                            </div>
                        </>}

                        {selectedFile && <>
                            <h3>File name :</h3> {selectedFile.name}  <br />
                            {/* <button onClick={()=>{
                                console.log("annotationVocal",annotationVocal)
                               getBase64(annotationVocal).then(result =>{
                                console.log('result',result);
                               })
                            }}>click me</button> */}
                            <h3>Content :</h3>  
                           {selectedFile.contentType!=="text/plain" && <FileViewer fileType={selectedFile.contentType} filePath={selectedFile.path}  />}
                           {selectedFile.contentType==="text/plain" && <p>{text}</p> }
                            {/* <DocViewer pluginRenderers={()=>{
                                DocViewerRenderers()
                            }} documents={[{uri:require('./Document.docx')}]} /> */}
                            
                            {(!selectedFile.annotationVocal && (userRole === "supervisor" || userRole === "annotator")) && <h3>Record the topic :</h3>}
                            {selectedFile.annotationVocal && <React.Fragment>
                                <h3>The topic : </h3>
                                
                                {/* to show the record */}
                                <SoundPrint url={selectedFile.annotationVocal}></SoundPrint>



                            </React.Fragment>}
                            {(!selectedFile.annotationVocal && (userRole === "supervisor" || userRole === "annotator")) && <React.Fragment>
                                <Recorder
                                    record={true}
                                    title={"New recording"}
                                    audioURL={audioDetails.url}
                                    showUIAudio
                                    handleAudioStop={data => handleAudioStop(data)}
                                    handleAudioUpload={data => handleAudioUpload(data)}
                                    handleCountDown={data => handleCountDown(data)}
                                    handleReset={() => handleReset()}
                                    mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
                                />                                <br />
                                <br />
                                {open && <Alert severity="error" onClose={() => { setOpen(false) }}> <b>You didn't record the topic !</b> </Alert>}
                                <br />


                                <Button variant="contained" onClick={() => { annotateProject(); }}
                                >Submit</Button>

                            </React.Fragment>


                            }
                        </>}

                        {(selectedFile?.annotationVocal && !selectedFile?.validationVocal && (userRole === "supervisor" || userRole === "validator")) && <div>

                            {/* record again for correction */}


                            <Recorder
                                    record={true}
                                    title={"New recording"}
                                    audioURL={audioDetails.url}
                                    showUIAudio
                                    handleAudioStop={data => handleAudioStopCorrection(data)}
                                    handleAudioUpload={data => handleAudioUpload(data)}
                                    handleCountDown={data => handleCountDown(data)}
                                    handleReset={() => handleReset()}
                                    mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
                                />
                            {/* <TextField fullWidth multiline label="Correct if it's false" variant="outlined" onChange={(e) => { setCorrectingAnnotationVocal(e.target.value) }} /> <br /> <br /> */}



                            <Button variant="contained" color="success" onClick={() => {
                                validateProject();
                            }}>Validate</Button>
                        </div>}

                        {selectedFile?.validationVocal !== "" && selectedFile?.annotationVocal && <div>
                            <b style={{ color: 'green' }}>Correction : </b> 
                            <SoundPrint url={selectedFile.validationVocal}></SoundPrint>
                            
                        </div>}
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}

export default Tts
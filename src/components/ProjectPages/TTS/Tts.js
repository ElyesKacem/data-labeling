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




const PROJECT_URL = "/project"

const Tts = () => {

    const { projectId } = useParams();
    const { userRole } = useParams();

    const [files, setFiles] = useState([]);

    // alert settings
    const [open, setOpen] = React.useState(false);

    const { auth } = useAuth();

    const [annotationValue, setAnnotationValue] = useState("");
    const [correctingAnnotation, setCorrectingAnnotation] = useState('');

    const [selectedFile, setSelectedFile] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    const annotateProject = () => {
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
                            ...selectedFile, annotation: annotationValue,
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
                let obj = {
                    projectId,
                    fileId: selectedFile._id,
                    validation: correctingAnnotation,
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
                        ...selectedFile, validation: correctingAnnotation,
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
                        ...selectedFile, annotation: annotationValue,
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
        console.log(data)
        setAudioDetails(data);
    }

    const handleAudioUpload = (file) => {
        console.log(file);
    }

    const handleCountDown = (data) => {
        console.log(data);
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
    console.log(audioDetails);
    const [text,setText] = useState();
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
                                <h1>Please select the audio file to work in</h1>
                            </div>
                        </>}

                        {selectedFile && <>
                            <h3>Audio :</h3> {selectedFile.name}
                            <div>
                                {selectedFile.path}
                            </div>
                            {(!selectedFile.annotation && (userRole === "supervisor" || userRole === "annotator")) && <h3>Write the topic :</h3>}
                            {selectedFile.annotation && <React.Fragment>
                                <h3>The topic : </h3>
                                <p> {atob(selectedFile.annotation)}</p>



                            </React.Fragment>}
                            {(!selectedFile.annotation && (userRole === "supervisor" || userRole === "annotator")) && <React.Fragment>
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
                                {open && <Alert severity="error" onClose={() => { setOpen(false) }}>Please write the topic !</Alert>}
                                <br />


                                <Button variant="contained" onClick={() => { annotateProject(); }}
                                >Submit</Button>

                            </React.Fragment>


                            }
                        </>}

                        {(selectedFile?.annotation && !selectedFile?.validation && (userRole === "supervisor" || userRole === "validator")) && <div>
                            <TextField fullWidth multiline label="Correct if it's false" variant="outlined" onChange={(e) => { setCorrectingAnnotation(e.target.value) }} /> <br /> <br />
                            <Button variant="contained" color="success" onClick={() => {
                                validateProject();
                            }}>Validate</Button>
                        </div>}

                        {selectedFile?.validation !== "" && selectedFile?.annotation && <div>
                            <b style={{ color: 'green' }}>Correction : </b> {selectedFile?.validation}
                        </div>}
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}

export default Tts
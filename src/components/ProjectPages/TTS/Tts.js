import React, { useEffect, useState } from 'react'
import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import BasicTable from './table'; import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';
import FileViewer from "react-file-viewer";
import { green } from '@mui/material/colors';
import { Fab } from '@mui/material';
import SoundPrintValidation from './soundPrintValidation';
import SoundPrintAnnotation from './soundPrintAnnotation';





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
        if (!annotationVocal) {
            setOpen(true);
        }
        else {
            setOpen(false);

            const controller = new AbortController();
            const annotateFile = async () => {
                try {
                    const response = await axiosPrivate.put("/project/annotate/tts",
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
                let validationVocalCorrection = correctingAnnotationVocal;
                if (!correctingAnnotationVocal) {
                    validationVocalCorrection = selectedFile.annotationVocal;

                }
                let obj = {
                    projectId,
                    fileId: selectedFile._id,
                    validationVocal: validationVocalCorrection,
                    validatedBy: auth.user,
                    selectedFileId: selectedFile.id
                }

                const response = await axiosPrivate.put("/project/annotate/tts",
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
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(PROJECT_URL + "/" + projectId, {
                    params: { id: projectId },
                    signal: controller.signal
                });
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
        setAudioDetails(data);
        getBase64(data.blob).then(result => {
            setAnnotationVocal(result);
        })
    }

    const handleAudioStopCorrection = async (data) => {
        setAudioDetails(data);
        getBase64(data.blob).then(result => {
            setCorrectingAnnotationVocal(result);
        })
    }

    const handleAudioUpload = (file) => {
    }

    const handleCountDown = (data) => {
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
    const [text, setText] = useState();

    // const getText = (path) => {
    //     var formatPath = path.split(',')[1];
    //     var textValue = atob(formatPath);
    //     return textValue
    // }

    useEffect(() => {
        if (selectedFile?.contentType === 'text/plain') {

            var content = selectedFile.path.split(',')[1];
            setText(atob(content));
        }
    }, [selectedFile])

    const getBase64 = (file) => {
        return new Promise(resolve => {

            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                let baseURL = reader.result;
                resolve(baseURL);
            };

        });
    };

    ///////////////////////file export
    const exportFiles = async () => {
        const exportProject = async () => {
            const controller = new AbortController();
            try {
                const response = await axiosPrivate.get("/project/export", {
                    params: { projecID: projectId },
                    signal: controller.signal
                });
                return response.data;
            } catch (error) {
                console.error(error);
                navigate('/login', { state: { from: location }, replace: true })
                return null;
            }
        }
        const data = await exportProject();
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "project.json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
    }
    return (
        <div>this is tts page (work in progress)
            <Grid container spacing={4}>
                <Fab onClick={exportFiles} variant="extended" sx={{
                    position: 'absolute',
                    top: 100,
                    right: 16,
                    color: 'common.white',
                    bgcolor: green[500],
                    '&:hover': {
                        bgcolor: green[600],
                    }
                }}>
                    Export
                </Fab>
                <Grid item xs={6}>
                    <BasicTable text={text} setText={setText} selectedFile={selectedFile} setSelectedFile={setSelectedFile} data={files} />

                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: 20, paddingTop: 1 }}>
                        {!selectedFile &&
                            <>
                                <div>
                                    <h1>Please select the text file to work in</h1>
                                </div>
                            </>
                        }

                        {selectedFile &&
                            <>
                                {/* file info ///////////////////////////////////////// */}
                                <h3>File name :</h3>
                                {selectedFile.name}
                                <br />
                                <h3>Content :</h3>
                                {selectedFile.contentType !== "text/plain" && <FileViewer fileType={selectedFile.contentType} filePath={selectedFile.path} />}
                                {selectedFile.contentType === "text/plain" && <p>{text}</p>}

                                {/* annotation ///////////////////////////////////////// */}
                                {(!selectedFile.annotationVocal && (userRole === "supervisor" || userRole === "annotator")) &&
                                    <>
                                        <div>
                                            <h3>Record the topic :</h3>
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
                                            <Button
                                                variant="contained"
                                                onClick={() => { annotateProject(); }}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </>
                                }
                                <div>
                                    {selectedFile.annotationVocal &&
                                        <div>
                                            <h3>The topic : </h3>
                                            <SoundPrintAnnotation url={selectedFile.annotationVocal} />
                                        </div>
                                    }
                                </div>


                                {/* validation ///////////////////////////////////////// */}
                                {(selectedFile?.annotationVocal && !selectedFile?.validationVocal && (userRole === "supervisor" || userRole === "validator")) &&
                                    <React.Fragment>
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
                                    </React.Fragment>
                                }
                                <div>
                                    {(selectedFile?.validationVocal && selectedFile?.annotationVocal) &&
                                        <div>
                                            <b style={{ color: 'green' }}>Correction : </b>
                                            <SoundPrintValidation url={selectedFile.validationVocal}></SoundPrintValidation>
                                        </div>
                                    }
                                </div>
                            </>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Tts
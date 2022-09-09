//*********************************************************************/
//
// IMPORTANT : IF YOU ARE WORKING WITH ARRAYS , DO NOT FORGET TO USE INDEX
//
//*********************************************************************/


import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FileUpload from "react-mui-fileuploader"
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import useAuth from '../../hooks/useAuth';
import UserLine from '../UserLine/UserLine';
import { Navigate, location, useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const steps = ['Description', 'Upload files', 'Collaborating'];
const UPLOAD_URL = '/upload';
const USERS_URL = "/users";

export default function HorizontalLinearStepper() {
  // const [isParentData, setIsParentData] = React.useState("true");

  const { auth } = useAuth();


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [projectTitle, setProjectTitle] = React.useState("");
  const [projectType, setProjectType] = React.useState("TTS");
  const [projectFiles, setProjectFiles] = React.useState([]);

  // user Options of Auto Complete
  const [selectedUsers, setSelectedUsers] = React.useState([{ id: '', username: '', role: 'Annotator' }]);


  // const [hiddenCollab, setHiddenCollab] = React.useState([]);


  const [formErrorMessage, setFormErrorMessage] = React.useState();
  const [formErrorMessageState, setFormErrorMessageState] = React.useState(false);

  // const {auth}=useAuth();
  console.log(auth);
  console.log("auth in stepepr", auth.user);

  // const [defaultf, setDefaultf] = React.useState();
  const handleFilesChange = async (files) => {
    
    setProjectFiles(files);
    // console.log("tesssssssssssssssst", defaultf);
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (data) => {
    console.log(data)
    //save data
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post('project',
        JSON.stringify(data),
        {
          headers: { "content-type": "application/json" },
          withCrendentials: true,
          signal: controller.signal
        });
      navigate('/project/' + response.data + "/supervisor", { state: { from: location }, replace: true })
    } catch (error) {
      console.error(error);
      navigate('/login', { state: { from: location }, replace: true })
    }
  }

  const handleNext = (e) => {
    if (e.target.innerText !== 'Next') {
      const data = preparingFormData();
      if (data) {
        handleSubmit(data);
      }

    }
    else {

      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const preparingFormData = () => {
    if (projectTitle !== '') {

      const data = {
        owner: auth.id,
        title: projectTitle,
        type: projectType,
        files: projectFiles,
        collabs: selectedUsers.filter((line) => line.username !== '')
      }
      console.log('data : ', data);
      return data;
    }
    else {
      setFormErrorMessage('Please choice a title for your project.');
      setFormErrorMessageState(true);
      return undefined;
    }

  }




  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === 2 && ( // here we must execute the creation of the project
        <React.Fragment>
          <br />
          <FormLabel id="Title">Choice your collaborators</FormLabel><br /><br />




          <UserLine selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />




        </React.Fragment>
      )}


      {activeStep === 1 && (
        <FormControl>
          <br /> <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

          
          {/* <FormLabel id="Title">Choice the file</FormLabel><br /> */}
          <FileUpload
            multiFile={true}
            disabled={false}
            title={"Choice the file"}
            header="Drag to drop"
            leftLabel="or"
            rightLabel="to select files"
            buttonLabel="click here"
            buttonRemoveLabel="Remove all"
            // // defaultFiles={defaultf}
            // maxFileSize={50}
            maxUploadFiles={0}
            // maxFilesContainerHeight={357}
            errorSizeMessage={'fill it or move it to use the default error message'}
            // allowedExtensions={['jpg', 'jpeg', 'png']}
            onFilesChange={handleFilesChange}
            //onError={handleFileUploadError}
            // imageSrc={'path/to/custom/image'}
            bannerProps={{ elevation: 0, variant: "outlined" }}
            containerProps={{ elevation: 0, variant: "outlined" }}
          />
          </div>
          {/* <UploadAudio /> */}
        </FormControl>
      )}
      <br />
      {activeStep === 0 && (
        <FormControl>

          <FormLabel id="Title">Project title</FormLabel><br />
          <TextField value={projectTitle} fullWidth label="Title" id="Title" required onChange={(e) => {

            setProjectTitle(e.target.value);
          }
          } /> <br />
          <FormLabel >Project type</FormLabel>
          <RadioGroup

            value={projectType}
            name="radio-buttons-group" required
            onChange={(e, value) => {

              setProjectType(value);

            }
            }
          >
            <FormControlLabel id="TTS" value="TTS" control={<Radio />} label="TTS" />
            <FormControlLabel id="STT" value="STT" control={<Radio />} label="STT" />
            <FormControlLabel id="other" value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="contained"
          style={{ textTransform: 'none' }}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

        <Button variant="contained" style={{ textTransform: 'none' }} onClick={(e) => handleNext(e)}>
          {activeStep === steps.length - 1 ? 'Create' : 'Next'}
        </Button>
      </Box>
      <br />
      {formErrorMessageState && <Alert severity="error" onClose={() => { setFormErrorMessageState(false) }}>{formErrorMessage}</Alert>}

    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchBar from '../searchBar/searchBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import FileUpload from "react-mui-fileuploader"
import UploadAudio from '../UploadAudio';
import { axiosPrivate } from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const steps = ['Description', 'Upload files', 'Collaborating'];
const UPLOAD_URL = '/upload';
const USERS_URL = "/users";

export default function HorizontalLinearStepper() {
  // const [isParentData, setIsParentData] = React.useState("true");


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [projectTitle, setProjectTitle] = React.useState("");
  const [projectType, setProjectType] = React.useState("TTS");
  const [projectFiles, setProjectFiles] = React.useState([]);
  const [projectUsers, setProjectUsers] = React.useState([]);
  const [userCounter, setUserCounter] = React.useState(0);

  const [hiddenCollab, setHiddenCollab] = React.useState([]);

  const handleFilesChange = async (files) => {
    console.log("files:", files);

    setProjectFiles(files);
    // console.log("json files:",JSON.stringify(files));
    // const response = await axiosPrivate.post(
    //   UPLOAD_URL,
    //   JSON.stringify({

    //     files: files,
    //     projectTitle:projectTitle,
    //     projectType:projectType,
    //     projectUsers:projectUsers

    //   }),
    //   {
    //     headers: { 'content-type': 'application/json' },
    //     withCredentials: true
    //   });
    //   console.log(response);
  }



  const [users, setUsers] = React.useState([]);
  

  
  //getting users
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL, {
          signal: controller.signal
        });
        console.log('get all users response', response.data);
        isMounted && setUsers(response.data);
        console.log('testttttttttttttttttttttttttttttttt', users);
        setUsersOptions(response.data.map((user) => user.username));
        console.log(usersOptions);
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



  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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

  const handleDeleteCollab = (id) => {
    
    const visibleUser=hiddenCollab.map(((line)=>line.id===id));
    console.log('visible User ',visibleUser);
    console.log('hiddenCollab ',hiddenCollab);
    users.push(visibleUser);
    setUsers(users);

    
    const newCollabList = projectUsers.filter(line => line.id !== id)
    // console.log(newCollabList);
    setProjectUsers(newCollabList);
  }
// user Options of Auto Complete
const [usersOptions, setUsersOptions] = React.useState([]);
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          //   if (isStepOptional(index)) {
          //     labelProps.optional = (
          //       <Typography variant="caption">Optional</Typography>
          //     );
          //   }
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

          
          {
            projectUsers.map((data) => (

              <div key={data.id} id={data.id} style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 10, alignItems: 'center' }}>








                <SearchBar id={data.id} key={data.id} setUsersOptions={setUsersOptions} hiddenCollab={hiddenCollab} setHiddenCollab={setHiddenCollab} options={usersOptions} width="250px"  />

                {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="demo-simple-select-label">Age</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={"Annotator"}
      label="Age"
      onChange={()=>{
        // e.target.value
      }}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl> */}



                <IconButton aria-label="delete" color="primary" onClick={(e) => {
                  // console.log('user to add : ',e.target.value);
                  // const newUserList=users;
                  // newUserList.push(e.target.value);
                  // setUsers(newUserList);
                  handleDeleteCollab(data.id);
                }}>
                  <DeleteIcon />
                </IconButton>

              </div>

            ))
          }


          <Button style={{ textTransform: 'none', marginTop: 30 }} variant="outlined" startIcon={<AddIcon />}

            onClick={(e) => {
              setUserCounter(userCounter + 1);
              // console.log(userCounter);
              const data = {
                id: userCounter,
                user: '',
                role: ''
              };
              projectUsers.push(data)
              // console.log(projectUsers);
              setProjectUsers(projectUsers);
            }}
          >
            Add new collab
          </Button>



        </React.Fragment>
      )}


      {activeStep === 1 && (
        <FormControl>
          <br /> <div>

          </div>
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
          {/* <UploadAudio /> */}
        </FormControl>
      )}
      <br />
      {activeStep === 0 && (
        <FormControl>

          <FormLabel id="Title">Project title</FormLabel><br />
          <TextField fullWidth label="Title" id="Title" required onChange={(e) => {

            setProjectTitle(e.target.value);
          }
          } /> <br />
          <FormLabel >Project type</FormLabel>
          <RadioGroup

            defaultValue="TTS"
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

        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Create' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

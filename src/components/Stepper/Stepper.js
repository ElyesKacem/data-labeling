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
import { TextField } from '@mui/material';
import FileUpload from "react-mui-fileuploader"
import UploadAudio from '../UploadAudio';
import { axiosPrivate } from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const steps = ['Description', 'upload files', 'labels'];
const UPLOAD_URL = '/upload';

export default function HorizontalLinearStepper() {

  const axiosPrivate = useAxiosPrivate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const handleFilesChange = async (files) => {
    console.log(files);
    const response = await axiosPrivate.post(
      UPLOAD_URL,
      JSON.stringify(files),
      {
        headers: { 'content-type': 'application/json' },
        withCredentials: true
      });
      console.log(response);
  }

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
          <Typography sx={{ mt: 2, mb: 1 }}>Step Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repellat assumenda possimus saepe laborum nam temporibus ad quia ex beatae aspernatur non quidem eveniet, distinctio expedita explicabo nisi iusto porro.
            {activeStep + 1}</Typography>

          <SearchBar />


        </React.Fragment>
      )}


      {activeStep === 1 && (
        <FormControl>
          <FileUpload

            multiFile={true}
            disabled={false}
            title={null}
            header="[Drag to drop]"
            leftLabel="or"
            rightLabel="to select files"
            buttonLabel="click here"
            buttonRemoveLabel="Remove all"
            maxFileSize={10}
            maxUploadFiles={0}
            maxFilesContainerHeight={357}
            errorSizeMessage={'fill it or move it to use the default error message'}
            allowedExtensions={['jpg', 'jpeg', 'png']}
            onFilesChange={handleFilesChange}
            //onError={handleFileUploadError}
            imageSrc={'path/to/custom/image'}
            bannerProps={{ elevation: 0, variant: "outlined" }}
            containerProps={{ elevation: 0, variant: "outlined" }}
          />
          {/* <UploadAudio /> */}
        </FormControl>
      )}

      {activeStep === 0 && (
        <FormControl>
          <Typography sx={{ mt: 2, mb: 1 }}>Step Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repellat assumenda possimus saepe laborum nam temporibus ad quia ex beatae aspernatur non quidem eveniet, distinctio expedita explicabo nisi iusto porro.
            {activeStep + 1}</Typography>
          <TextField fullWidth label="Title" id="fullWidth" />
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
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

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

const steps = ['Description', 'Category', 'Roles'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repellat assumenda possimus saepe laborum nam temporibus ad quia ex beatae aspernatur non quidem eveniet, distinctio expedita explicabo nisi iusto porro.
           {activeStep + 1}</Typography>
          
        </React.Fragment>
      )}

{activeStep === 1 && (
  <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
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
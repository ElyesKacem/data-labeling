import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";
import Button from '@mui/material/Button';



const SoundPrintAnnotation = ({ url }) => {
  const waveformAnnotation = useRef(null);

  useEffect(() => {
    // Check if wavesurfer object is already created.
    if (!waveformAnnotation.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveformAnnotation.current = Wavesurfer.create({
        container: "#waveformAnnotation",
        waveColor: "#567FFF",
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 3,
        cursorColor: "#567FFF",
      });
      // Load audio from a remote url.
      // waveform.current.load(url);
      /* To load a local audio file
		    1. Read the audio file as a array buffer.
			2. Create a blob from the array buffer
			3. Load the audio using wavesurfer's loadBlob API
	 */
    }
  }, []);
  useEffect(() => {
    waveformAnnotation.current.load(url)
  
    return () => {
      
    }
  }, [url])
  

  const playAudio = () => {
    // Check if the audio is already playing
    if (waveformAnnotation.current.isPlaying()) {
      waveformAnnotation.current.pause();
    } else {
      waveformAnnotation.current.play();
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
      <div id="waveformAnnotation" />
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}} 
      // divDirection="row"
      //  justifyContent="center"
       >
        <Button variant="outlined" onClick={playAudio}>Play / Pause</Button>
      </div>
    </div>
  );
};

export default SoundPrintAnnotation;

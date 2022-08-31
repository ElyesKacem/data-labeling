import React from 'react'
import AudioPlayer from '../AudioPlayer/AudioPlayer'

import TextField from '@mui/material/TextField';

const Stt = () => {
  return (
    <div>
        <AudioPlayer />
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          //value={value}
          //onChange={handleChange}
        />
    </div>
  )
}

export default Stt
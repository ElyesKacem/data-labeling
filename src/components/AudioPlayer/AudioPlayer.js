import ReactPlayer from 'react-player';

const AudioPlayer = (props) => {
   return (
      <>
       
         <ReactPlayer className='react-player' controls={true} url={props.file} />
      </>
   )
}

export default AudioPlayer;
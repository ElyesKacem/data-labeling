import React from 'react'
import ReactDOM from 'react-dom';
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
//import MyCustomPlugin from 'my-custom-plugin-path';

const GETFILES_URL = "/file/getFiles"

const AudioPlayer = () => {
   const [playList, setPlayList] = React.useState();
   const axiosPrivate = useAxiosPrivate();
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getFiles = async () => {
         try {
            const response = await axiosPrivate.get(GETFILES_URL, {
               signal: controller.signal
            });
            console.log('get all files response', response.data);
            isMounted && setPlayList(response.data);
         } catch (error) {
            console.error(error);
            //navigate('/login', { state: { from: location }, replace: true })
         }
      }
      getFiles();

      return () => {
         isMounted = false;
         controller.abort();
      }
   }, [])




   return (
      <>
         {/* <SpectrumVisualizer
            audio="https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3"
            theme={SpectrumVisualizerTheme.line}
            colors={['#009688', '#26a69a']}
            iconsColor="#26a69a"
            backgroundColor="white"
            showMainActionIcon
            showLoaderIcon
            highFrequency={8000}
         /> */}
         <ReactPlayer className='react-player' controls="true" url="https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3" />
      </>
   )
}

export default AudioPlayer;
import React from 'react'
import ReactDOM from 'react-dom';
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

const AudioPlayer = () => {
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
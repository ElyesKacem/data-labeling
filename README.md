<h1 align="center">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2" viewBox="0 0 16 16">
  <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
  <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
</svg>
Data Labeling
<p align='center'>
<img src='https://img.shields.io/netlify/69141fdb-6979-491a-af61-1852fe23b2b1?style=flat-square' alt='build'>
<img src='https://img.shields.io/github/license/Rajatm544/react-audio-editor?style=flat-square' alt='license'>
<img src='https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square' alt='maintained'>
</p>
	
</h1>

-   An app to visualise audio files as waveforms, and to edit it in the browser!
-   The app is built using React.js(CRA) and [wavesurfer.js](https://wavesurfer-js.org/)
-   There are 2 routes in the app:
    -   The `/` route is used to upload the audio file
    -   The `/edit` route is used to edit the audio waveform
-   The varios controls included are as follows:
    -   play/pause
    -   replay
    -   trimming a particular section of the audio waveform
    -   zooming in/out using a slider
    -   volume level
    -   toggle switch
-   The app is deployed to [Netlify](https://www.netlify.com/) using continuous integration from the Github repo

## Steps to get started

-   Fork and clone this repo using `git clone https://github.com/ElyesKacem/data-labeling.git`
-   `npm install` all dependencies
-   `npm start` to run the react app locally
-   Refer the wavesurfer.js docs to add new features!

## Deployment steps

-   Push all the code to this repo
-   Create a new site on Netlify, choose the correct repository
-   Set the `Build command` to be `CI= npm run build`
-   Set the `Publish directory`option to be `/build`
-   Choose a unique site name
-   Start deployment

## Tools used for this project

-   [React.js](https://reactjs.org/): A popular JS library for building user interfaces
-   [wavesurfer.js](https://wavesurfer-js.org/): A customizable audio waveform visualization, built on top of Web Audio API and HTML5 Canvas.
-   [React MUI](https://materializecss.com/): A modern frontend framework, here it is used for the design.

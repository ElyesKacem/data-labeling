import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";

import { WaveformContianer, Wave, PlayButton } from "./Waveform.styled";

class Waveform extends Component {
  state = {
    playing: false
  };

  componentDidMount() {
    const track = document.querySelector("#track");

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      barRadius: 3,
      barGap: 2,
      barMinHeight: 1,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: "#FE6E00",
      responsive: true,
      waveColor: "#C4C4C4",
      cursorColor: "transparent"
    });

    this.waveform.load(track);
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
   

    return (
      <WaveformContianer>
        <PlayButton onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </PlayButton>
        <Wave id="waveform" style={{overflow:'initial !important'}}/>
        <audio id="track" src={this.props.url} />
        <div>0.52</div>
      </WaveformContianer>
    );
  }
}

export default Waveform;

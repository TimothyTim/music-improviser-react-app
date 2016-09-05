import React from 'react';
import BeatRow from '../BeatRow/BeatRow.js';

class Beat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instruments: [
        'hihat',
        'snare',
        'kick'
      ],
      subBeats: 16
    };

    this.drawInstrumentRow = this.drawInstrumentRow.bind(this);
  }


  drawInstrumentRow(instrument, index) {
    return (
      <div key={index}>
        <BeatRow subBeats={this.state.subBeats} instrument={instrument} />
      </div>
    );
  }

  render() {
    return (
      <div id="beat-container" className="beat">
        {this.state.instruments.map(this.drawInstrumentRow)}
      </div>
    );
  }
}

export default Beat;

import React, {PropTypes} from 'react';
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
    this.drawSubbeatColumns = this.drawSubbeatColumns.bind(this);
  }


  drawInstrumentRow(instrument, index) {
    return (
      <div className="beat__row">
        {index}{". "}{instrument}
        <BeatRow />
      </div>
    );
  }

  drawSubbeatColumns() {

  }

  render() {
    return (
      <div className="beat">
        {this.state.instruments.map(this.drawInstrumentRow)}
      </div>
    );
  }
}

export default Beat;

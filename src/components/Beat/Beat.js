import React from 'react';
import {connect} from 'react-redux';

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
    this.drawRows = this.drawRows.bind(this);
    this.drawItem = this.drawItem.bind(this);
    this.getSubBeatPositionFromIndex = this.getSubBeatPositionFromIndex.bind(this);
  }

  drawRows() {
    const {subBeats} = this.state;
    let item = [];

    for (let i = 0; i < subBeats; i++) {
        item.push(this.drawItem(i));
    }

    return (
        <div className="beat__row__list">
            {item}
        </div>
    );
  }

  getSubBeatPositionFromIndex(index) {


  }

  drawItem(index) {
    const beatPos = this.getSubBeatPositionFromIndex(index);

    return (
        <div key={index} className={`beat__row__list__item ${index}`}>{index}</div>
    );
  }

  drawInstrumentRow(instrument, index) {
    return (
      <div key={index}>
        <div className="beat__row">
              <div className="beat__row__label">{this.props.instrument}</div>
              {this.drawRows()}
        </div>
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

function mapStateToProps(state) {
    return {
        clock: state.clock
    };
}


export default connect(
    mapStateToProps
)(Beat);

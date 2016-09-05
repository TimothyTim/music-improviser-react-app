import React, {PropTypes} from 'react';

class BeatRow extends React.Component {
  constructor(props) {
    super(props);

    this.drawRows = this.drawRows.bind(this);
    this.drawItem = this.drawItem.bind(this);
  }

  drawRows() {
    const {subBeats} = this.props;

    return (
      for (let i = 0; i < subBeats.length; i++) {
        {this.drawItem}
      }
    );

  }

  drawItem() {

    return (
      <div className="beat-row__item">

      </div>
    );
  }

  render() {
    return (
      <div className="beat-row">
        {this.drawRows()}
      </div>
    );
  }
}

BeatRow.propTypes = {
  subBeats: PropTypes.number.isRequired
}

export default BeatRow;

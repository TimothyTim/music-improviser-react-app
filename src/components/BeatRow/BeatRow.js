import React, {PropTypes} from 'react';

class BeatRow extends React.Component {
  constructor(props) {
    super(props);

    this.drawRows = this.drawRows.bind(this);
    this.drawItem = this.drawItem.bind(this);
  }

  drawRows() {
    const {subBeats} = this.props;
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

  drawItem(index) {
    return (
        <div key={index} className="beat__row__list__item">{index}</div>
    );
  }

  render() {
    return (
      <div className="beat__row">
            <div className="beat__row__label">{this.props.instrument}</div>
            {this.drawRows()}
      </div>
    );
  }
}

BeatRow.propTypes = {
  subBeats: PropTypes.number.isRequired,
  instrument: PropTypes.string.isRequired
};

export default BeatRow;

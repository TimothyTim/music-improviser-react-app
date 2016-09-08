import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class Beat extends React.Component {
  constructor(props) {
    super(props);

    this.drawRow = this.drawRow.bind(this);
    this.drawItem = this.drawItem.bind(this);
    this.getItemState = this.getItemState.bind(this);
    this.initItemState = this.initItemState.bind(this);

    const instruments = [
      'hihat',
      'snare',
      'kick'
  ];

    const subBeats = 16;

    this.state = {
      instruments: instruments,
      subBeats: subBeats
    };

    this.items = this.initItemState(instruments, subBeats);
  }

  initItemState(instruments, subBeats) {
      let itemsState = [];
      let instrumentsArray = [];

      for (let x = 0; x < subBeats; x++) {
          itemsState.push('inactive');
      }

      for (let i = 0; i < instruments.length; i++) {
          instrumentsArray.push(itemsState);
      }

      return instrumentsArray;
  }

  getItemState(rowIndex, index) {
      return this.items[rowIndex][index];
  }

  setItemState(rowIndex, index) {
      let items = _.clone(this.items);
      const itemState = items[rowIndex][index];

      if (itemState === 'active') {
          items[rowIndex][index] = 'inactive';
      } else {
          items.forEach((itemArray, arrayIndex) => {
              if (arrayIndex === rowIndex) {
                  itemArray[index] = 'active'
              }
          })
      }

      this.setState({items: items});
  }

  drawRow(row, rowIndex) {
      return (
          <div key={rowIndex} className="beat__row">
              <div className="beat__row__label">{this.state.instruments[rowIndex]}</div>
              <div className="beat__row__list">
                  {row.map((itemState, index) => {
                      return this.drawItem(itemState, index, rowIndex);
                  })}
              </div>
          </div>
      );
  }

  drawItem(itemState, index, rowIndex) {
      const id = rowIndex + "-" + index;

      return (
          <div key={id}
              className={`beat__row__list__item no-select ${id} is-${itemState}`}
              onClick={this.setItemState.bind(this, rowIndex, index)}
          >
              {index}
          </div>
      );
  }

  render() {
    return (
      <div id="beat-container" className="beat">
        {this.items.map(this.drawRow)}
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

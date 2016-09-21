import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as clockActions from '../Actions/clockActions';

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.changeTempo = this.changeTempo.bind(this);
    }

    changeTempo(e) {
        const upperLimit = 200;
        const lowerLimit = 40;
        let {value} = e.currentTarget;

        if (value < lowerLimit) {
            value = lowerLimit;
        } else if (value > upperLimit) {
            value = upperLimit;
        }

        this.props.actions.tempo({ tempo: value });
    }

    render() {
        const {isOpen} = this.props;
        // const tempo = _.get(this.props, 'clock.tempo', 60);
        // <div>
        //     <h2>Master settings</h2>
        //     <label>Tempo: </label>
        //     <input type="number" min="20" max="200" defaultValue={tempo} className="tempo" onChange={this.changeTempo} />
        //     <br />
        // </div>
        const hideClass = isOpen ? 'show' : 'hide';
        return (
            <div className={`tool settings ${hideClass}`}>
                <div>
                    <h3>Midi Input Device: </h3>
                    <table id="midi_source">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td className="name"></td>
                            </tr>
                            <tr>
                                <td>Manufacturer</td>
                                <td className="manufacturer"></td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td className="state"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="key_data"></div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    clock: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        clock: state.clock
    };
}

function mapDispatchToProps(dispatch) {
    // defines what actions are avaiable in the Component

    return {
        actions: bindActionCreators(clockActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

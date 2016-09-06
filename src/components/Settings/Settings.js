import React, {PropTypes} from 'react';

class Settings extends React.Component {

    render() {
        const {tempo, changeTempo, isOpen} = this.props;
        const hideClass = isOpen ? 'show' : 'hide';
        return (
            <div className={`tool settings ${hideClass}`}>
                <div>
                    <h2>Master settings</h2>
                    <label>Tempo: </label>
                    <input type="number" min="20" max="200" defaultValue={tempo} className="tempo" onChange={changeTempo} /><br />
                </div>
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
    tempo: PropTypes.number.isRequired,
    changeTempo: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default Settings;

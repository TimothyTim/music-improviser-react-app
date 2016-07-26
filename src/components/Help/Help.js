import React, {PropTypes} from 'react';

class Help extends React.Component {

    render() {
        const {isOpen} = this.props;
        const hideClass = isOpen ? 'show' : 'hide';
        return (
            <div className={`tool help ${hideClass}`}>
                <h2>Music Improviser</h2>
                <p>Press play....</p>
            </div>
        );
    }
}

Help.propTypes = {
    isOpen: PropTypes.bool.isRequired
};

export default Help;

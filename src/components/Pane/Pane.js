import React from 'react';

const Pane = React.createClass({
    displayName: 'Pane',
    propTypes: {
        label: React.PropTypes.string.isRequired,
        children: React.PropTypes.element.isRequired
    },
    render: function() {
        return (
            <div className="pane">
                {this.props.children}
            </div>
        );
    }
});

export default Pane;

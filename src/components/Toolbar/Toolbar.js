import React, {PropTypes} from 'react';

class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this.renderToolItem = this.renderToolItem.bind(this);
    }

    renderToolItem(tool, index) {
        const {toggleTool, activeTool} = this.props;

        return (
            <li key={index}>
                <button className={`toolbar__button ${activeTool === tool.name ? 'active' : ''}`} onClick={toggleTool.bind(null, tool.name)}>
                    <i className={`fa fa-${tool.icon}`} aria-hidden="true"></i>
                </button>
            </li>
        );
    }

    render() {
        return (
            <ul className="toolbar">
                {this.props.tools.map(this.renderToolItem)}
            </ul>
        );
    }
}

Tooltip.propTypes = {
    toggleTool: PropTypes.func.isRequired,
    activeTool: PropTypes.string,
    tools: PropTypes.array.isRequired
};

export default Tooltip;

import React from 'react';

const Tabs = React.createClass({
    displayName: 'Tabs',
    propTypes: {
        selected: React.PropTypes.number,
        children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.element]).isRequired
    },
    getDefaultProps: function() {
        return {selected: 0};
    },
    getInitialState: function() {
        return {selected: this.props.selected};
    },
    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps || this.state !== nextState;
    },
    handleClick: function(index, event) {
        event.preventDefault();
        this.setState({selected: index});
    },
    _renderTitles: function() {
        function labels(child, index) {
            const activeClass = (this.state.selected === index
                ? 'active'
                : '');
            return (
                <li key={index}>
                    <a href="#" className={`tabs__labels__link ${activeClass}`} onClick={this.handleClick.bind(this, index)}>
                        <i className={`fa fa-${activeClass ? 'dot-' : ''}circle-o`} aria-hidden="true"></i>
                        {child.props.label}
                    </a>
                </li>
            );
        }
        return (
            <ul className="tabs__labels">
                {this.props.children.map(labels.bind(this))}
            </ul>
        );
    },
    _renderContent: function() {
        function tabView(child, index) {
            const activeClass = (this.state.selected === index
                ? 'show'
                : 'hide');
            return (
                <div className={`tabs__content__container ${activeClass}`}>
                    {child}
                </div>
            );
        }
        return (
            <div className="tabs__content">
                {this.props.children.map(tabView.bind(this))}
            </div>
        );
    },
    render: function() {
        return (
            <div className="tabs">
                {this._renderTitles()}
                {this._renderContent()}
            </div>
        );
    }
});

export default Tabs;

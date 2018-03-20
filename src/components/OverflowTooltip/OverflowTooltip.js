import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import "./OverflowTooltip.css";

export default class OverflowTooltip extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            overflow: false
        }
    }

    componentDidMount() {
        this.checkOverflow()
    }

    componentWillReceiveProps() {
        this.setState({ overflow: false })
    }

    componentDidUpdate() {
        this.checkOverflow()
    }

    checkOverflow() {

        const element = ReactDOM.findDOMNode(this)
        let overflow = false;

        if (element.offsetWidth === element.scrollWidth && element.offsetWidth !== 0) {
            element.style.width = (element.offsetWidth + 2) + 'px';
        } else if (element.offsetWidth < element.scrollWidth && !this.state.overflow) {
            overflow = true
        }

        if (overflow !== this.state.overflow) {
            this.setState({ overflow: overflow })
        }
    }

    render() {
        
        let childProps = { className: "OverflowTooltip" };
        
        if (this.state.overflow) {
            childProps.title = this.props.title;
        }

        return React.cloneElement(
            React.Children.only(this.props.children),
            childProps
        )
    }
}

OverflowTooltip.displayName = 'OverflowTooltip'
OverflowTooltip.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}
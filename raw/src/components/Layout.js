import React from 'react'
import "./Layout.sass"

class Wrapper extends React.Component {
    render() {
        return (
            <div className="Wrapper">
                {this.props.children}
            </div>
        )
    }
}
class GraphView extends React.Component {
    static defaultProps = {
        position: { top: 0, left: 0 },
    }

    render() {
        return (
            <div className="GraphView" style={this.props.position}>
                {this.props.children}
            </div>
        )
    }
}

class Sidebar extends React.Component {
    static defaultProps = {
        appearTransitionClass: "fadeInRight",
        position: { top: 0, right: 0 },
    }

    render() {
        return (
            <div className={`Sidebar animated ${this.props.appearTransitionClass}`}
                style={this.props.position}>
                {this.props.children}
            </div>
        )
    }
}

export { Wrapper, GraphView, Sidebar }
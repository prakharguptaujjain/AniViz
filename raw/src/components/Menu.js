import React from "react";
import { withRouter } from "react-router-dom";
import "./Menu.sass";

const menuRoutes = [
    { path: "/history", text: "History" },
    { path: "/bubble", text: "Genres" },
    { path: "/sankey", text: "Studios" },
    { path: "/chord", text: "Actors" },
];

function Menu(Component) {
    class _Menu extends React.Component {
        constructor(props) {
            super(props);
            this.routeChangeCallbacks = [];
            this.linkTo = this.linkTo.bind(this);
            this.onRouteChange = this.onRouteChange.bind(this);
        }

        current(path) {
            return this.props.location.pathname === path ? "current" : null;
        }

        linkTo(path) {
            if (this.props.location.pathname !== path) {
                this.routeChangeCallbacks.forEach(cb => cb(path));
                this.props.history.push(path);
            }
        }

        onRouteChange(callback) {
            this.routeChangeCallbacks.push(callback);
        }

        render() {
            const navContent = menuRoutes.map(e => (
                <a key={e.path} onClick={() => this.linkTo(e.path)} className={this.current(e.path)}>
                    {e.text}
                </a>
            ));
            return (
                <div className="Main">
                    <div className="Menu">
                    <h4 onClick={() => window.location.href = "https://github.com/prakharguptaujjain/AniViz"}>
                    AniViz(B21AI027 B21AI003)
                    </h4>
                        <nav>{navContent}</nav>
                    </div>
                    <div className="Content">
                        <Component {...this.props} onRouteChange={this.onRouteChange} linkTo={this.linkTo} />
                    </div>
                </div>
            );
        }
    }

    return withRouter(_Menu);
}

export { Menu };

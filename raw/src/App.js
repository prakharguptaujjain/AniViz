import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { BubblePage } from './pages/bubble/BubblePage'
import { HistoryPage } from './pages/history/HistoryPage'
import { Menu } from './components/Menu'
import { SankeyPage } from './pages/sankey/SankeyPage'
import { ChordPage } from './pages/chord/ChordPage'

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Switch>
            <Redirect exact from="/" to="/history" />
            <Route path="/bubble" component={Menu(BubblePage)} />
            <Route path="/history" component={Menu(HistoryPage)} />
            <Route path="/chord" component={Menu(ChordPage)} />
            <Route path="/sankey" component={Menu(SankeyPage)} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App

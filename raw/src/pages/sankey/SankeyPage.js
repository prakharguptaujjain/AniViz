import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMouse } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import './SankeyPage.sass'
import { Wrapper, GraphView, Sidebar } from '../../components/Layout'
import { constructSankey } from './SankeyAmcharts'

// src - from google

class SankeyPage extends React.Component {
  constructor() {
    super()
    this.state = {
      type: null,
      display: null,
      exit: false,
    }

    this.setDisplay = this.setDisplay.bind(this)
    this.renderSidebar = this.renderSidebar.bind(this)
  }

  setDisplay(object, type) {
    this.setState({
      type: type,
      display: object,
    })
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data/sankey.json`)
      .then(res => res.json())
      .then(json => {
        this.chart = constructSankey(json, this.setDisplay)
      })

    // register callback when route changes
    this.props.onRouteChange(path => {
      if (path !== "/sankey") {
        this.setState({
          exit: true,
        })
      }
    })
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  renderSidebar() {
    switch (this.state.type) {
      case null:
        return (
          <div className="StudiosExplanation">
            <h2>Studios</h2>
          </div>
        )

      case "studio":
        const studio = this.state.display
        return (
          <div className="StudioDetails">
            <h2>{studio.name}</h2>
            <img src={studio.image} alt={studio.name} />
            <p>{studio.description}</p>
            <p><b>Location: </b> {studio.hq}</p>
            <p><b>Founded: </b> {studio.date}</p>
            <p><b>Top 3 animes of the studio:</b></p>
            <table>
              {studio.top.map(anime =>
                <tr>
                  <td className="ImageCell">
                    <img src={anime.image} alt={anime.name} />
                  </td>
                  <td>
                    <p>{anime.title}</p>
                    <p>{anime.aired}</p>
                    <p>View count: {anime.views}</p>
                  </td>
                </tr>
              )}
            </table>
          </div>
        )

      case "genre":
        const genre = this.state.display
        return (
          <div>
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
          </div>
        )
    }
  }

  render() {
    return (
      <div id="Studios">
        <Wrapper>
          <GraphView>
            <div id="chartdiv"></div>
          </GraphView>
          <Sidebar appearTransitionClass={this.state.exit ? "fadeOutLeft" : "fadeInLeft"}>
            <div className="SidebarContent">
              { // Show close button if any details info is shown
                this.state.type === null ? null :
                  <FontAwesomeIcon icon={faTimesCircle} color="#fff" size="3x"
					 	        className="close-icon"
                    onClick={() => this.setDisplay(null, null)}
                    style={{ float: "right", margin: "0 0 15px 15px", cursor: "pointer" }} />
              }
              {this.renderSidebar()}
            </div>
          </Sidebar>
        </Wrapper>

      </div>
    );
  }
}

export { SankeyPage }
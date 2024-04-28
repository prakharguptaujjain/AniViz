import React from 'react'
import { constructChord } from './ChordAmcharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

import './ChordPage.sass'
import { Wrapper, GraphView, Sidebar } from '../../components/Layout'

// src - from google
class ChordPage extends React.Component {
	constructor() {
		super()
		this.state = {
			actor: null,
		}

		this.setActor = this.setActor.bind(this)
		this.renderSidebar = this.renderSidebar.bind(this)
	}

	setActor(actor) {
		this.setState({
			actor: actor,
		})
	}

	componentDidMount() {
		fetch(`${process.env.PUBLIC_URL}/data/artist.json`)
			.then(res => res.json())
			.then(json => {
				this.chart = constructChord(json, this.setActor)
			})
	}

	componentWillUnmount() {
		if (this.chart) {
			this.chart.dispose()
		}
	}

	renderSidebar() {
		if (this.state.actor === null) {
			return (
				<div>
					<h2>Voice Actors</h2>
					<h3>Click on a voice actor to see more details</h3>
				</div>
			)
		} else {
			const actor = this.state.actor
			return (
				<div className="ActorDetails">
					<FontAwesomeIcon icon={faTimesCircle} color="#fff" size="3x"
					 	className="close-icon"
						onClick={() => this.setActor(null)}
						style={{ float: "right", margin: "0 0 15px 15px", cursor: "pointer" }} />
					<h2>{actor.name}</h2>
					<img src={actor.image_url} alt={actor.name} />
					<p>{actor.about}</p>
					<p><b>Birthday:</b> {new Date(actor.birthday).toDateString()}</p>
					<p><b>Top characters played by this actor:</b></p>
					<table>
						{actor.animes.map(e =>
							<tr>
								<td class="ImageCell"><img src={e.image} alt={e.anime} /></td>
								<td>
									<p>{e.character}</p>
									<p>{e.anime}</p>
								</td>
							</tr>)
						}
					</table>
				</div>
			)
		}
	}

	render() {
		return (
			<Wrapper>
				<GraphView position={{ right: 0 }}>
					<div id="Chord">
						<div id="chartdiv"></div>
						<div id="chart-options">
							<div className="select">
								<select id="filter">
									<option className="filterOpt">Japanese</option>
									<option className="filterOpt">English</option>
									<option className="filterOpt">Korean</option>
									<option className="filterOpt">Italian</option>
									<option className="filterOpt">French</option>
									<option className="filterOpt">Spanish</option>
									<option className="filterOpt">German</option>
									<option className="filterOpt">Hungarian</option>
									<option className="filterOpt">Brazilian</option>
									<option className="filterOpt">Hebrew</option>
									<option className="filterOpt">Mandarin</option>
								</select>
							</div>
							<div className="select">
								<select id="top">
									<option className="topOpt" value="5">Top 5</option>
									<option className="topOpt" value="10">Top 10</option>
									<option className="topOpt" value="20" selected>Top 20</option>
									<option className="topOpt" value="30">Top 30</option>
									<option className="topOpt" value="40">Top 40</option>
								</select>
							</div>
							<button id="SortByPopularity" className="button">Sort by popularity</button>
							<button id="SortByName" className="button">Sort by alphabetical order</button>
						</div>
						<div id="Scale">
							<p class="Legend"># of times favorited</p>
							<p class="First">250</p>
							<p class="Second">1000</p>
							<p class="Third">2500</p>
						</div>
					</div>
				</GraphView>
				<Sidebar position={{ top: 0, left: 0 }}>
					<div className="SidebarContent">
						{this.renderSidebar()}
					</div>
				</Sidebar>
			</Wrapper>
		)
	}
}

export { ChordPage }
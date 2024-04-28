import React from 'react'
import { faQuoteLeft, faCircle, faMouse } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper, GraphView, Sidebar } from '../../components/Layout'
import './HistoryPage.sass'


// src - from google

function Colordot(col, amt) {
    col = col.slice(1);
    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    return "#" + (g | (b << 8) | (r << 16)).toString(16);
}


class HistoryPage extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            selected: null,
            clicked: null,
            exit: false,
        }
        const limits = {
            max_ep_count: 50,
            min_ep_count: 0,
            maxShade: -90,
            minShade: 60
        }
        const ratio = (limits.maxShade - limits.minShade) / (limits.max_ep_count - limits.min_ep_count)
        this.shadeColor = (color, ep_cnt) => {
            if (ep_cnt > limits.max_ep_count) ep_cnt = limits.max_ep_count
            return Colordot(color, ratio * ep_cnt + limits.minShade)
        }

        this.setSelected = this.setSelected.bind(this)
        this.setClicked = this.setClicked.bind(this)
    }

    componentDidMount() {
        fetch(`${process.env.PUBLIC_URL}/data/history.json`)
            .then(response => response.json())
            .then(newData => {
                this.setState({
                    data: newData
                })
            })

        this.props.onRouteChange(path => {
            if (path !== "/history") {
                this.setState({
                    exit: true,
                })
            }
        })
    }

    setSelected(anime) {
        this.setState({
            selected: anime,
        })
    }

    setClicked(anime, event) {
        if (event !== undefined) { event.stopPropagation() }
        this.setState({
            clicked: anime,
            selected: null,
        })
    }

    scroll() {
        window.scrollBy({
            top: 400,
            behavior: "smooth"
        })
    }

    dotplot() {
        return (
            <div id="Histogram" onClick={(event) => this.setClicked(null, event)}>
                {Object.entries(this.state.data).map((yearToAnime, index) => {
                    const [year, animes] = yearToAnime
                    const animationDelay = `${index * 0.01 % 0.5}s`
                    return (
                        <div className="row wow fadeInUp" key={year} data-wow-delay={animationDelay}>
                            <span className="year">{year}</span>
                            <div className="dots">
                                {animes.map(anime => {
                                    const bgColor = { backgroundColor: this.shadeColor("#F59B00", anime.episodes) }
                                    return (
                                        <div className="dot"
                                            onMouseEnter={this.state.clicked === null ? () => this.setSelected(anime) : () => { }}
                                            onMouseLeave={this.state.clicked === null ? () => this.setSelected(null) : () => { }}
                                            onClick={(event) => this.setClicked(anime, event)}
                                            key={anime.anime_id}
                                            style={bgColor}>
                                            <p>&nbsp;</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <div id="HistogramBottom">
                    <p>&nbsp;</p>
                </div>
            </div>
        )
    }

    renderSidebar() {
        const anime = (this.state.clicked !== null) ? this.state.clicked : this.state.selected
        return (
            <div id="HistogramDetails">
                {anime === null ?
                    (
                        <div className="Infos">
                            <h2>History of Anime</h2>
                            <p> Hover / click on a dot to learn more about an anime</p>

                            <p class="Definition">
                                Anime is must
                            </p>
                        </div>
                    ) :
                    (
                        <div className="AnimeDetails">
                            { // display close button if anime has been clicked
                                this.state.clicked === null ? null :
                                    <FontAwesomeIcon icon={faTimesCircle} color="#fff" size="3x"
                                        className="close-icon"
                                        onClick={(event) => this.setClicked(null, event)}
                                        style={{ float: "right", margin: "0 0 15px 15px", cursor: "pointer" }} />
                            }

                            <h2>{anime.title}</h2>
                            { // Image should not be null
                                (anime.image_url === null) ? null : <img src={anime.image_url} alt={anime.title} />
                            }
                            <p>
                                Episode count: {anime.episodes}
                                <FontAwesomeIcon icon={faCircle}
                                    color={this.shadeColor("#F59B00", anime.episodes)}
                                    style={{ marginLeft: "5px", border: "1px solid #666", borderRadius: "100%" }}
                                />
                            </p>
                            <p>Aired: {anime.aired_string}</p>
                            <p>Type: {anime.type}</p>
                            <p>Source: {anime.source}</p>
                            <p>Duration: {anime.duration}</p>
                            <p>Producer: {anime.producer}</p>
                            <p>Studio: {anime.studio}</p>
                            <p>Genre: {anime.genre}</p>
                            <p>MyAnimeList ID: {anime.anime_id}</p>
                        </div>
                    )
                }
            </div>
        )
    }

    render() {
        return (
            <div id="History">
                <Wrapper>
                    <GraphView>
                        {this.dotplot()}
                    </GraphView>
                    <Sidebar appearTransitionClass={this.state.exit ? "fadeOutLeft" : "fadeInRight"}>
                        {this.renderSidebar()}
                    </Sidebar>
                </Wrapper>
            </div>
        )
    }
}

export { HistoryPage }
import React, {Component} from 'react';
import axios from 'axios';
import styles from './App.module.css';

import Apex from '../Apex/Apex';
import Warzone from '../COD/Warzone';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codstats: {
                wins: 0,
                kills: 0,
                level: 0,
                kdr: 0,
                top5: 0
            },
            apexstats: {
                legend: '',
                wins: 0,
                kills: 0,
                level: 0
            },
            gtag: '',
            psn: false,
            xbl: false
        }
        this.callAPI = this.callAPI.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleButtonChange = this.handleButtonChange.bind(this)
    }

    callAPI() {
        axios.get(`http://localhost:5500/${this.state.psn ? 'psn' : this.state.xbl ? 'xbl' : null }/${this.state.gtag}`)
            .then(res => {
                let warzone = res.data['1'] ? res.data['1'] : null;
                let apex = res.data['2'] ? res.data['2'].data : null;
                this.setState({
                    codstats: {
                    wins: warzone.lifetime.mode.br.properties.wins,
                    kills: warzone.lifetime.mode.br.properties.kills,
                    level: warzone.level,
                    kdr: warzone.lifetime.mode.br.properties.kdRatio.toFixed(2),
                    top5: warzone.lifetime.mode.br.properties.topFive
                },
                    apexstats: {
                        legend: apex.children[0].metadata.icon,
                        wins: apex.stats[apex.stats.findIndex(el => el.metadata.key === 'Season4Wins')].value,
                        kills: apex.stats[1].value,
                        level: apex.metadata.level
                    }
                })
            })
            .catch(err => err)
    }

    handleChange(e) {
        this.setState({gtag: e.target.value})
        e.preventDefault();
    }

    handleSubmit(e) {
        this.callAPI();
        e.preventDefault();
    }

    
    handleButtonChange(e) {
        e.target.name === 'psn' ? 
        this.setState({ 
            psn: true
        }) :
        e.target.name === 'xbl' ?
        this.setState({ 
            xbl: true
        }) : null
    }

    render() {
        return (
            <div className={styles.App}>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.searchContainer}>
                        <div className={styles.psnChoice}>
                        <button
                            type="button"
                            id={styles.psn}
                            className={styles.psnButton}
                            value="psn"
                            name="psn"
                            onClick={this.handleButtonChange}
                        >PSN</button>
                        </div>
                        <div className={styles.xboxChoice}>
                        <button 
                            type="button"
                            id={styles.xbl}
                            className={styles.xboxButton}
                            value="xbl"
                            name="xbl"
                            onClick={this.handleButtonChange}
                        >XBOX LIVE</button>
                        </div>
                        <div className={styles.playerSearch}>
                            <input 
                                className={styles.searchName}
                                type="text"
                                placeholder="Search Player"
                                value={this.state.value}
                                onChange={this.handleChange}
                                id="gtag"
                                name="gtag"
                                required="required">
                            </input>
                            <button className={styles.searchBtn} type="submit">Go</button>
                        </div>
                    </div>
                </form>
                <div className={styles.gameContainer}>
                    <div className={styles.warzone}>
                    <div className={styles.wzTitle}></div>
                        <Warzone 
                            wins={this.state.codstats.wins}
                            kills={this.state.codstats.kills}
                            level={this.state.codstats.level}
                            kdr={this.state.codstats.kdr}
                            top5={this.state.codstats.top5}
                        />
                    </div>
                    <div className={styles.apex}>
                        <div className={styles.apexTitle}></div>
                        <Apex
                            legend={this.state.apexstats.legend}
                            wins={this.state.apexstats.wins}
                            kills={this.state.apexstats.kills}
                            level={this.state.apexstats.level}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

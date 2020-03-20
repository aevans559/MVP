import React, {Component} from 'react';
import axios from 'axios';
import styles from './App.module.css';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codstats: {
                wins: 0,
                kills: 0
            },
            gtag: '',
            psn: false,
            xbl: false
        }
        this.callAPI = this.callAPI.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    }

    callAPI() {
        axios.get(`http://localhost:5500/${this.state.psn ? 'psn' : this.state.xbl ? 'xbl' : null }/${this.state.gtag}`)
            .then(res => {
                console.log(res.data)
                this.setState({ codstats: {
                    wins: res.data.lifetime.mode.br.properties.wins,
                    kills: res.data.lifetime.mode.br.properties.kills
                }})
            })
            .catch(err => err)
    }

    componentDidMount() {
        console.log('mounted')
    }

    handleChange(e) {
        this.setState({gtag: e.target.value})
        e.preventDefault();
    }

    handleSubmit(e) {
        this.callAPI();
        e.preventDefault();
    }

    handleCheckboxChange(e) {
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
                    <label>
                    PSN
                    <input
                        type="checkbox"
                        name="psn"
                        value="psn"
                        onChange={this.handleCheckboxChange}
                    />
                    </label>
                    <label>
                    Xbox Live
                    <input 
                        type="checkbox"
                        name="xbl"
                        value="xbl"
                        onChange={this.handleCheckboxChange}
                    />
                    </label>
                    <br/>
                    <label>Gamertag:</label>
                    <input 
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        id="gtag"
                        name="gtag"
                        required="required">
                    </input>
                    <button type="submit">Search</button>
                </form>
                <div className={styles.userInfo}>
                <p>{this.state.codstats.username}</p>
                <br/>
                Wins: {this.state.codstats.wins}
                <br/>
                Kills: {this.state.codstats.kills}
                </div>
            </div>
        )
    }
}

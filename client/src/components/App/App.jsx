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
            gtag: ''
        }
        this.callAPI = this.callAPI.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    callAPI() {
        axios.get(`http://localhost:5500/gtag/${this.state.gtag}`)
            .then(res => {
                // const codstats = res.data
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
    }

    handleSubmit(e) {
        this.callAPI();
        console.log(this.state.gtag)
        e.preventDefault();
    }

    render() {
        return (
            <div className={styles.App}>
                <form onSubmit={this.handleSubmit}>
                    <label>Gamertag:</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} id="gtag" name="gtag" required="required"></input>
                    <button type='submit'>Search</button>
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

import React from 'react';
import styles from './Fortnite.module.css';

const Fortnite = (props) => {
    return (
        <div>
            <div className={styles.fnUserInfo}>
            Wins: {props.wins}
            <br/>
            Kills: {props.kills}
        </div>
        </div>
    )
}

export default Fortnite

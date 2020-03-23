import React from 'react';
import styles from './Apex.module.css';

const Apex = (props) => {
    let style = {
        backgroundImage: `url(${props.legend})`
    }

    return (
        <div className={styles.apexUserBg} style={{backgroundImage: style.backgroundImage}}>
            <div className={styles.apexUserInfo}>
                <p>Wins: {props.wins}</p>
                <p>Kills: {props.kills}</p>
                <p>Level: {props.level}</p>
            </div>
        </div>
    )
};

export default Apex;

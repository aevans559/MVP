import React from 'react'
import styles from './Warzone.module.css';

const Warzone = (props) => {
    return (
        <div className={styles.wzUserBg}>
            <div className={styles.wzUserInfo}>
                <p>Wins: {props.wins}</p>
                <p>Kills: {props.kills}</p>
                <p>Level: {props.level}</p>
                <p>K/D Ratio: {props.kdr}</p>
                <p>Top 5: {props.top5}</p>
            </div>
        </div>
    )
};

export default Warzone;
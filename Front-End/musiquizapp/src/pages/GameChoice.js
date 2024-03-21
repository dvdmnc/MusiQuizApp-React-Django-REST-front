import React from 'react'
import '../App.css';
import Button from '../components/Button';

export default function GameChoice() {
    return(
        <div id="button-container">
            <Button link={'/setgame'} text={'Jeu en équipe'}/>
            <div style={{width: '200px', height: '50px'}}></div>
            <Button link={'/setgame'} text={'Jeu Collectif'}/>
        </div>
    )
}
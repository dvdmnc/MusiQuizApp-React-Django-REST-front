import React from 'react'
import '../App.css';
import Button from '../components/Button';

export default function NewGame() {
    return(
        <div id="launchgame">
            <Button link={'/gamechoice'} text={'Nouvelle Partie'}/>
        </div>
    )
}
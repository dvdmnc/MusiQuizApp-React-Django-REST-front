import React, { useEffect, useState } from 'react'
import '../App.css';
import {useLocation} from 'react-router-dom'
import Audio from '../components/Audio';
import ScoreTable from '../components/ScoreTable';
import Faces from '../components/Faces';
import Timer from '../components/Timer';
import Pause from '../components/Pause';
import Play from '../components/Play';
import Next from '../components/Next';
import TeamOrTurn from '../components/TeamOrTurn';
import EndButton from '../components/EndButton';

function Game() {
    const location = useLocation()
    const { set } = location.state
    
    const GameType= set[0]
    const NumberTeamOrTurn = set[1]
    const Time = set[2]

    const [dataFetch, setData] = useState([])
    const [songs, setSongs] = useState([])
    const [singers, setSingers] = useState([])
    const [faces, setFaces] = useState([])
    const[audios, setAudios] = useState([])
    const[pause, setPause] = useState('play')
    const [restart, setRestart] = useState(1)
    const [link, setLink] = useState('')
    let arr = []
    for(let i = 0; i < NumberTeamOrTurn; i++){
        arr.push(0)
    }
    const [scores, setScores] = useState(arr)

    const PauseorPlay = (data) => {
        setPause(data);
      }
    
    const SetNewGame = () =>{
        GetData()
        setRestart(restart + 1)
        setPause('play')  
        Array.from(document.querySelectorAll('.songlink')).forEach(song =>{
            song.style.color = 'black'
            song.style.backgroundColor = 'white'
        })
        Array.from(document.querySelectorAll('.namelink')).forEach(name =>{
            name.style.color ='black'
            name.style.backgroundColor = 'white'
        })
        Array.from(document.querySelectorAll('.listendisplay')).forEach(audio =>{
            audio.firstElementChild.style.color = 'black'
            audio.firstElementChild.style.backgroundColor = 'white'
            audio.firstElementChild.style.pointerEvents = 'fill'
            audio.firstElementChild.nextElementSibling.style.filter = 'none'
        })
        Array.from(document.querySelectorAll('.facelink')).forEach(face =>{
            face.firstElementChild.style.filter = 'none'
            face.firstElementChild.style.pointerEvents = 'fill'
        })
        
    }

    let GetData = async() => {
        try {
            singers.length = faces.length = audios.length = 0 //Clean previous singers, faces and samples
            const response = await fetch('https://api-musiquizapp.up.railway.app/api/');
            const data = await response.json();
            setData(data)
    
            const songs_list = data[0];
            const songs_samples = data[3]
            const songs_singers = data[2]
            const singers_names_faces= data[1]
    
            const newSongs = [];
            const newSingers = [];
            const newFaces = [];
            const newAudios = [];
    
            for (let j = 9; j >= 0; j--) {
                let index = Math.floor(Math.random() * songs_list.length);
                newSongs.push(songs_list[index]);
                newAudios.push(songs_samples[songs_list[index]]);
                for (let key in songs_singers) {
                    if (songs_singers[key].includes(songs_list[index])) {
                        if (newSingers.includes(key)) {
                            continue;
                        }
                        newSingers.push(key);
                    }
                }
                songs_list.splice(index, 1);
            }
    
            for (let y = 0; y < newSingers.length; y++) {
                newFaces.push(singers_names_faces[newSingers[y]]);
            }
    
            setSongs(newSongs);


           
            for (let b = newSingers.length -1; b >= 0; b--){ //Display the singers in random order
                var index = Math.floor(Math.random() * newSingers.length);
                singers.push(newSingers[index])
                newSingers.splice(index,1);
            }

            for (let b = newFaces.length -1; b >= 0; b--){ //Display the faces in random order
                var index = Math.floor(Math.random() * newFaces.length);
                faces.push(newFaces[index])
                newFaces.splice(index,1);
            }

            for (let b = newAudios.length -1; b >= 0; b--){ //Display the samples in random order
                var index = Math.floor(Math.random() * newAudios.length);
                audios.push(newAudios[index])
                newAudios.splice(index,1);
            }

    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        GetData()
    }, [])

    const SetLink = (data) =>{
        const songs_samples = dataFetch[3]
        const songs_singers = dataFetch[2]
        const singers_names_faces= dataFetch[1]

        if (pause === 'suivant'){
            alert('Fin du tour')
        }
        else if(scores[restart-1] === 30){
            alert('Maximum de points atteint')
            setPause('suivant')
        }
        else if (link === ''){
            setLink(data)
        }
        else{
        try{
            if((singers_names_faces[link] === data)|| (singers_names_faces[data] === link) ||(songs_singers[link]?.includes(data)) || (songs_singers[data]?.includes(link)) || (songs_samples[link] === data) || (songs_samples[data] === link)){
            alert("Bon Choix Bravo !")
            scores[restart-1] += 1
            if ([...document.querySelectorAll('*')].find(el => el.textContent === link) !== undefined){
                let element = [...document.querySelectorAll('*')].find(el => el.textContent === link)
                element.style.background = 'black'
                element.style.color = 'white'
            }else if (document.querySelector(`audio[src="${link}"]`) !== null){
                let element = document.querySelector(`audio[src="${link}"]`)
                element.pause()
                element.style.filter = "blur(5px)"
                element.previousElementSibling.style.background = 'black'
                element.previousElementSibling.style.color = 'white'
                element.previousElementSibling.style.pointerEvents = 'none'
            }else{
               let element = document.querySelector(`img[src="${link}"]`)
               element.style.filter = "blur(5px)"
               element.style.pointerEvents = 'none'
            }
            if ([...document.querySelectorAll('*')].find(el => el.textContent === data) !== undefined){
                let element = [...document.querySelectorAll('*')].find(el => el.textContent === data)
                element.style.background = 'black'
                element.style.color = 'white'
            }else if (document.querySelector(`audio[src="${data}"]`) !== null){
                let element = document.querySelector(`audio[src="${data}"]`)
                element.pause()
                element.style.filter = "blur(5px)"
                element.previousElementSibling.style.background = 'black'
                element.previousElementSibling.style.color = 'white'
                element.previousElementSibling.style.pointerEvents = 'none'
            }else{
                let element = document.querySelector(`img[src="${data}"]`)
                element.style.filter = "blur(5px)"
                element.style.pointerEvents = 'none'
            }
            setLink('')
            return }
        } catch(error){
            console.error(error)
        }
        alert("Mauvais Choix")
        setLink('')
    }
    }

    const AudiosDisplay = audios.map((audio, index) => {
        return <Audio key={index} source={audio} link={SetLink}/>;
})

    const SongsDisplay = songs.map((song, index) => (
        <a className="songlink" key={index} onClick={() => {SetLink(song)}}>{song}</a> 
    ))

    const SingersDisplay = singers.map((singer, index) => (
        <>
        {index % 2 === 0 ?
        (<div id='namesdiv'>
            <a className="namelink" key={index} onClick={() => {SetLink(singer)}}>{singer}</a>
            {singers[index+1] !== undefined ?
            (<a className="namelink" key={index+1} onClick={() => {SetLink(singers[index+1])}}>{singers[index+1]}</a>) : (null)
            }
        </div>) : (null)
        }
        </>
    ))
        
    const FacesDisplay = faces.map((face, index) => (
        <Faces key={index} source={face} link={SetLink}/>
    ))
    
    const shouldRender = songs.length > 0 && singers.length > 0 && faces.length > 0 && audios.length > 0;     
  return (
<div style={{display:'flex'}}>
    <div id="left_display">
        <div id="buttons">
            <Play data={PauseorPlay} />
            <Pause data={PauseorPlay}/>
            {pause === 'suivant' && restart < NumberTeamOrTurn ?(<Next next={SetNewGame}/>) : (null)}{pause === 'suivant' && restart == NumberTeamOrTurn ? (<EndButton scores={scores} type={GameType}/>) : (null)}
        </div>
        <div id="timeturns">
            <TeamOrTurn gametype={GameType} number={NumberTeamOrTurn} count={restart}/>
            <h5 id="timer">{shouldRender? (<Timer time={Time} data={pause} end={PauseorPlay} reset={restart}/>) : null}</h5>
        </div>
        <div id="listen">
            {shouldRender? (AudiosDisplay) : (<div className='loading'>En Chargement...</div>)}
        </div>
        <div id="songs">
        {shouldRender?( SongsDisplay ) : (<div className='loading' >En Chargement...</div>)}
        </div>
    </div>
    <div id="right_display" >
        <div id="faces">
        {shouldRender?(FacesDisplay) : (<div className='loading'>En Chargement...</div>)}
        </div>
        <br />
        <div id="names">
        {shouldRender?(SingersDisplay) : (<div className='loading'>En Chargement...</div>)}
        </div>
    </div>
    {GameType === 'Jeu en équipe' ? (<ScoreTable score={scores}/>) : null}
</div>
  )
}

export default Game

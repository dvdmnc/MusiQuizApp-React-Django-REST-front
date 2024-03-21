import React, { useEffect, useState } from 'react'

function Timer({time, data, end, reset}) {
    const initialSeconds = time * 60; // Convert minutes to seconds
    const [seconds, setSeconds] = useState(initialSeconds);
    let interval;
  
    useEffect(() => {
      if (data === "play" && seconds > 0) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
      }
  
      return () => clearInterval(interval);
    }, [data, seconds]);
  
    useEffect(() => {
      if (seconds === 0) {
        clearInterval(interval);
        end('suivant') 
      }
    }, [seconds, interval]);

    useEffect(() =>{
        if(seconds === 0){
            setSeconds(initialSeconds)
        }
    }, [reset])
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const remainingSeconds = time % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  


  return (
    <div>Temps restant : {formatTime(seconds)} minutes.</div>
  )
}

export default Timer

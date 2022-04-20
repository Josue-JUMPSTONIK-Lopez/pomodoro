
import React, { useState, useEffect, useRef } from 'react';

// import "./soundEffect.mp3"
export interface PomodoroCard{
    id: number;
    date: string,
    task: string,
    type: string,
    time: string,
}

export const usePomodoro = () => {
    const [seconds, setSeconds] = useState((1500))
    const [active, setActive] = useState(false);
    const [type, setType] = useState("Pomodoro");
    const [task, setTask] = useState("")
    const [count, setCount] = useState(1)
    const ref = useRef<number>();
    const audio = new Audio("./soundEffect.mp3")
    const date = new Date();
    const [PomodoroCards, setPomodoroCards] = useState<PomodoroCard[]>([]);

    useEffect(() => {
        // console.log(localStorage.getItem('counterID'))
        if (localStorage.getItem('counterID')) {
            setCount(parseInt(JSON.parse(localStorage.getItem('counterID') || "1")) + 1);
        }

        if(localStorage.getItem('PomodoroCards')){
            setPomodoroCards(JSON.parse(localStorage.getItem('PomodoroCards') || "{}"));
        }
    },[])
    

    useEffect(() => {
        ref.current && window.clearInterval(ref.current)
        ref.current = window.setInterval( () => {
        if(seconds>0 && active){
            setSeconds(seconds-1)
        }else if (seconds ===0) {
            finishTimer(type)
        }

        if (seconds === 0) {
            audio.play();
        }
        },1000);
    })

    const SegundosRestantes = () =>{
        let secondsTime = seconds % 60
        if (secondsTime === 0) {
            return "00";
        }else if (secondsTime <60 && secondsTime > 9) {
            return secondsTime
        }else if (secondsTime <= 9) {
            return `0${secondsTime}`
        }
    }

    const StartPomodoro =()=>{
    setActive(active => !active)

    }

    const setPomodoro = () =>{
    setSeconds(25*60);
    setActive(false);
    setType("Pomodoro");
    window.clearInterval(ref.current)
    }

    const setShortBreak = ()=>{
    setSeconds(5*60);
    setActive(false);
    setType("Short-break");
    window.clearInterval(ref.current)
    }

    const setLongBreak = ()=>{
        setSeconds(15*60);
        setActive(false);
        setType("Long-break");
        window.clearInterval(ref.current)
    }

    const setTime = (typeOfTimer:string)=>{
        let time = "";
        let mins;
        let secs = 60 - (seconds % 60);
        if (typeOfTimer === "Pomodoro") {
            mins = Math.trunc(((25*60)-seconds)/60)
        }else if (typeOfTimer === "Short-break") {
            mins = Math.trunc(((5*60)-seconds)/60)
        }else if (typeOfTimer === "Long-break") {
            mins = Math.trunc(((15*60)-seconds)/60)
        }
        time = `${mins}:${ secs< 10? "0" + secs: (secs %60) === 0 ? "00": secs}`
        return time
    }

    const resetTimer = (typeOfTimer:string) =>{
        if (typeOfTimer === "Pomodoro") {
            setPomodoro();
        }else if (typeOfTimer === "Short-break") {
            setShortBreak();
        }else if(typeOfTimer === "Long-break"){
            setLongBreak();
        }
    }

    const formatTime= (hour:number, mins:number) =>{
        let time;
        if (hour< 10) {
            time = `0${hour}`
        }else{
            time = `${hour}`
        } 
        if (mins < 10) {
            time += `:0${mins}`
        }else{
            time += `:${mins}`
        }
        return time
    }

    const savePomodoros = (Pomodoros: PomodoroCard[]) =>{
        localStorage.setItem('PomodoroCards', JSON.stringify(Pomodoros))
    }

    const saveCountOfPomodoros = (counter:number) =>{
        localStorage.setItem('counterID', count.toString())
    }

    const removePomodoroCard = (id:number) =>{
        const restOfPomodoros = PomodoroCards.filter(pomodoro => pomodoro.id !== id)
        setPomodoroCards(restOfPomodoros);
        savePomodoros(restOfPomodoros)
    }

    const finishTimer = (timerType:string) =>{
        // console.log(count)
        let PomodoroCard ={
        id: count,
        date: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} - ${formatTime(date.getHours(),date.getMinutes())}`,
        task,
        type: type,
        time: setTime(type),
        }
        // console.log(count+1)
        setPomodoroCards([...PomodoroCards, PomodoroCard]);
        savePomodoros([...PomodoroCards, PomodoroCard])
        saveCountOfPomodoros( count + 1)
        resetTimer(timerType);
        setCount(count + 1);
        console.log(count)
        setTask("");
        audio.play();
    }


    const setInputTask = (event:React.FormEvent<HTMLInputElement>) =>{
        setTask(event.currentTarget.value);
    }
    return {
        seconds,
        active,
        type,
        task,
        PomodoroCards,
        setPomodoro,
        setShortBreak,
        setLongBreak,
        finishTimer,
        SegundosRestantes,
        StartPomodoro,
        setInputTask,
        removePomodoroCard
    }
}


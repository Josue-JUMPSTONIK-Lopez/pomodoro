import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { ButtonSectionBottom } from './components/ButtonSectionBottom/ButtonSectionBottom';
import { ButtonSectionTop } from './components/ButtonSectionTop/ButtonSectionTop';
import { InputTask } from './components/InputTask/InputTask';
import { Logo } from './components/Logo/Logo';
import { PomodoroCard } from './components/PomodoroCard/PomodoroCard';
import { PomodoroList } from './components/PomodoroList/PomodoroList';
import { Record } from './components/Record/Record';
import { Selection } from './components/Selection/Selection';
import { Timer } from './components/Timer/Timer';
import { Tittle } from './components/Title/Tittle';
import { Header } from './containers/Header/Header';
import { Main } from './containers/Main/Main';

function App() {
  const [seconds, setSeconds] = useState((1500))
  const [active, setActive] = useState(false);
  const [type, setType] = useState("Pomodoro");
  const [task, setTask] = useState("")
  const ref = useRef<number>();
  const date = new Date();
  const [PomodoroCards, setPomodoroCards] = useState<PomodoroCard[]>([]);
  // console.log(seconds)

  useEffect(() => {
    ref.current && window.clearInterval(ref.current)
    ref.current = window.setInterval( () => {
      if(seconds>0 && active){
        setSeconds(seconds-1)
      }else if (seconds ===0) {
        finishTimer(type)
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
    // setMinutos(25);
    setSeconds(25*60);
    setActive(false);
    setType("Pomodoro");
    window.clearInterval(ref.current)
  }

  const setShotBreak = ()=>{
    // setMinutos(5);
    setSeconds(5*60);
    setActive(false);
    setType("Short-break");
    window.clearInterval(ref.current)
  }

  const setLongBreak = ()=>{
    // setMinutos(15);
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
      time = `${mins}:${ secs< 10? "0" + secs: (secs %60) === 0 ? "00": secs}`
    }else if (typeOfTimer === "Short break") {
      mins = Math.trunc(((5*60)-seconds)/60)
      time = `${mins}:${ secs< 10? "0" + secs: (secs %60) === 0 ? "00": secs}`
    }else if (typeOfTimer === "Long break") {
      mins = Math.trunc(((15*60)-seconds)/60)
      time = `${mins}:${ secs< 10? "0" + secs: (secs %60) === 0 ? "00": secs}`
    }
    return time
  }

  const resetTimer = (typeOfTimer:string) =>{
    if (typeOfTimer === "Pomodoro") {
      setPomodoro();
    }else if (typeOfTimer === "Short-break") {
      setShotBreak();
    }else if(typeOfTimer === "Long-break"){
      setLongBreak();
    }
  }

  const finishTimer = (timerType:string) =>{
    let PomodoroCard ={
      date: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}`,
      task,
      type: type,
      time: setTime(type),
    }
    setPomodoroCards([...PomodoroCards, PomodoroCard]);
    resetTimer(timerType);
    setTask("");
  }

  const setInputTask = (event:React.FormEvent<HTMLInputElement>) =>{
    setTask(event.currentTarget.value);
  }


  return (
    <div className="App">
      <Header>
        <Logo/>
      </Header>
      <Main type={type}>
        <Selection>
          <ButtonSectionTop>
            <Button onClick={setPomodoro} text="Pomodoro"/>
            <Button onClick={setShotBreak} text="Short break"/>
            <Button onClick={setLongBreak} text="Long break"/>
          </ButtonSectionTop>
          <Timer time={
            `${Math.trunc((seconds)/60)}:${SegundosRestantes()}`}/>
          <ButtonSectionBottom>
            <Button onClick={StartPomodoro} text="Start"/>
            {active && <Button onClick={() =>finishTimer(type)} text='Stop'/>}
          </ButtonSectionBottom>
        </Selection>
        <Record>
          <Tittle title='Task'/>
          <InputTask value={task} onChange={setInputTask}/>
          <hr/>
          <PomodoroList>
            {PomodoroCards.map(pomodoro =>
            <PomodoroCard date={pomodoro.date} time={pomodoro.time} type={pomodoro.type} task={pomodoro.task}/> )}
          </PomodoroList>
        </Record>
      </Main>
    </div>
  );
}

export default App;




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
import { usePomodoro } from './Hooks/usePomodoro';

function App() {
  
  const {
    seconds,
    type,
    active,
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
  } = usePomodoro();

  return (
    <div className="App">
      <Header>
        <Logo/>
      </Header>
      <Main type={type}>
        <Selection>
          <ButtonSectionTop>
            <Button onClick={setPomodoro} text="Pomodoro"/>
            <Button onClick={setShortBreak} text="Short break"/>
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
            <PomodoroCard key={pomodoro.id} date={pomodoro.date} time={pomodoro.time} type={pomodoro.type} task={pomodoro.task} id={pomodoro.id} removePomodoroCard={removePomodoroCard}/> )}
          </PomodoroList>
        </Record>
      </Main>
    </div>
  );
}

export default App;



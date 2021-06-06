import Home from "./Home.js";
import Game from "./Game.js";
import { useState, useRef, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getRandomAnimal } from "./APIHelper.js";
import { Toast } from "@sberdevices/plasma-ui";
import { useToast, Button } from "@sberdevices/plasma-ui";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
const initializeAssistant = (getState /*: any*/) => {
  if (true) {
    return createSmartappDebugger({
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZWI2ZWZmYjgyODFjZTAyMTlmYWVhNjhlODk2YzVhMGMwNmI2NDk3ZTNjYjA2ODg4OTZkNDYwNzkwNjFkYTAwNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYyMzA3NDU5MCwiaWF0IjoxNjIyOTg4MTgwLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiMzA3NTIwYzktY2ZkMS00ODBhLWFhMGUtMGNkM2U1ZDFjMDY2Iiwic2lkIjoiZTMxODM5N2UtN2U2Mi00NDkzLWI1MGQtYmUxMmZkNTAwYjdkIn0.ORovwcOrIZ3vzuGIA8Gs3_fSNlVjvHzMURtRUAxxM7nV41km1dsVzlE4yZkmJMtquatgHX4Jc0hXYQG4by-SbaDEcqyryvTRPhZ0-W6au67diFZgfcWZdm3h6w6O8sVrXSPyfCarwbdLkK6TA1q-HWMcoKpBwntBIW7R7Cr8l2gwO2ngSvYNlzwhJxTHZRKQeUMgPNK5jZAgqlVPPDpXsOYVESDpnEusYiwmbFUndjR8bE8r9KKiUEr3qDKNwIgZE25L-m0F3PqFmXIhRTs_Htboo7hvwpQRMa1IP7mJ_D_nvZt6FWAjD5wq4PWGAeyU1DkSsB3yNSpVgj2DUxYJHh7VCa2atNU2Tt3z95LCZSg1tDLCNquxO_60qQ0EC5DzAKuaXjqgDoc3lRGqIvZbbwhAxnXrDtVeIdDK_zgxAQ42W7VeaS1JOiGmkg-qNJ7maVQvkSR7qKiPEo3javJFX0UpXvkg3ewEvm3ZII_odsF222jkwD0rkdvKZgeQ7SJJpxvhAr0ieMBxn0XP9iJwpdi0H4UvmoDb3_SAcHueg9jcr0GEVQGnXNiSmDlqKlJIOnk8q4BebYd-eA8jdm9uBbo6DY8aVI9ZjtzvGJf_RbPpP1ZahvPGXtQVdbnuWICaIObFAxLzwB_VrcTfu7HfNUfsZr2kFyxA7rbKw-RDFTA" ??
        "",
      initPhrase: `Запусти Угадай животное`,
      getState,
    });
  }
  return createAssistant({ getState });
};
function App() {
  const [counter, setCounter] = useState(40);

  const history = useHistory();
  const solvedQuestions = useRef("");
  const amountOfSolvedQuestions = useRef(0);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [text, setText] = useState("");
  const [sound, setSound] = useState("");
  const [ans, setAns] = useState("");
  const { showToast, hideToast } = useToast();
  const [sumTime, setSumTime] = useState(0);
  useEffect(() => {
    setSumTime(sumTime + 1);
  }, [counter]);
  const refAnswer = useRef("");
  const refName = useRef();
  const processCard = async () => {
    console.log("Ответ юзера", refAnswer.current);
    console.log("Ответ правильный", name);

    if (refAnswer.current === refName.current) {
      //alert("Верно");
      await generateNewAnimal();
      showToast(`Верно!`, "top", 1000);
      setCounter(40);
      refAnswer.current = "";
    } else {
      if (playOrPractice == 0) {
        showToast(`Ошибка! Правильный ответ: ${refName.current}`, "top");
      } else {
        showToast("Ошибка!", "top", 1000);
      }
      //alert("Не верно");
    }
    setAns("");
  };
  const generateNewAnimal = () => {
    console.log(solvedQuestions.current);
    getRandomAnimal(solvedQuestions.current).then((x) => {
      if (solvedQuestions.current == "") {
        //setSolvedQuestions(solvedQuestions + `${x.id}`);
        solvedQuestions.current += `${x.id}`;
        console.log(solvedQuestions.current);
      } else {
        //setSolvedQuestions(solvedQuestions + "," + `${x.id}`);
        solvedQuestions.current += "," + `${x.id}`;
      }
      amountOfSolvedQuestions.current++;
      console.log(x);
      setPicture(x.picture);
      setName(x.name);
      setText(x.description);
      setSound(x.sound);
      refName.current = x.name;
    });
  };
  const linkToGame = () => {
    amountOfSolvedQuestions.current = 0;
    solvedQuestions.current = "";
    setCounter(40);
    setSumTime(0);
    assistant.current?.sendData({ action: { action_id: "game", payload: {} } });

    history.push("/game");
  };
  const [mode, setMode] = useState(0);
  const [playOrPractice, setPlayOrPractice] = useState(0);
  const assistant = useRef();
  useEffect(() => {
    //Инициализация ассистента
    assistant.current = initializeAssistant(() => getStateForAssistant());
    assistant.current.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

    assistant.current.on("data", (event /*: any*/) => {
      console.log(`assistant.on(data)`, event);
      const { action } = event;

      dispatchAssistantAction(action);
    });
  }, []);

  function getStateForAssistant() {
    return undefined;
  }
  const dispatchAssistantAction = async (action) => {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "choose_level":
          switch (action.data) {
            case "фото":
              setMode(0);
              linkToGame();
              break;
            case "описанию":
              setMode(1);
              linkToGame();
              break;
            case "описание":
              setMode(1);
              linkToGame();
              break;
            case "звуку":
              setMode(2);
              linkToGame();
              break;
            case "звук":
              setMode(2);
              linkToGame();
              break;
            default:
              break;
          }
          break;

        case "mode_of_game":
          switch (action.data) {
            case "тренировки":
              setPlayOrPractice(0);
              break;
            case "тренировка":
              setPlayOrPractice(0);
              break;
            case "игровой":
              setPlayOrPractice(1);
              break;
            case "игра":
              setPlayOrPractice(1);
              break;
            case "игры":
              setPlayOrPractice(1);
              break;
            default:
              break;
          }
        case "input_answer":
          refAnswer.current = action.data;
          setAns(action.data);
          break;
        case "send_answer":
          console.log("в сенд ансвере", solvedQuestions.current);
          processCard();
          break;
        case "go_home":
          history.push("/");
          assistant.current?.sendData({
            action: { action_id: "goneback", payload: {} },
          });

        default:
          break;
      }
    }
  };
  return (
    <Switch>
      <Route path="/game" exact>
        <Game
          mode={mode}
          playOrPractice={playOrPractice}
          sumTime={sumTime}
          setCounter={setCounter}
          answer={refAnswer}
          processCard={processCard}
          picture={picture}
          generateNewAnimal={generateNewAnimal}
          amountOfSolvedQuestions={amountOfSolvedQuestions}
          text={text}
          ans={ans}
          setAns={setAns}
          sound={sound}
          counter={counter}
          assistant={assistant}
        />
      </Route>
      <Route path="/">
        <Home
          linkToGame={linkToGame}
          setMode={setMode}
          setPlayOrPractice={setPlayOrPractice}
          setCounter={setCounter}
          playOrPractice={playOrPractice}
          amountOfSolvedQuestions={amountOfSolvedQuestions}
          solvedQuestions={solvedQuestions}
        />
      </Route>
    </Switch>
  );
}

export default withRouter(App);

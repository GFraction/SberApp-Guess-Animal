import Home from "./Home.js";
import Game from "./Game.js";
import { useState, useRef, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getRandomAnimal } from "./APIHelper.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
const initializeAssistant = (getState /*: any*/) => {
  if (true) {
    return createSmartappDebugger({
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ZWI2ZWZmYjgyODFjZTAyMTlmYWVhNjhlODk2YzVhMGMwNmI2NDk3ZTNjYjA2ODg4OTZkNDYwNzkwNjFkYTAwNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYyMTk2NzgwNCwiaWF0IjoxNjIxODgxMzk0LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiOTlmOWUwMWItOWM2Ny00MWUwLWE1MmItYmM2OGIyOTgyNjRhIiwic2lkIjoiYTc3NmZiYmEtZTMyZi00MzM5LThkYTgtMmU5NWFkNjNkZTBlIn0.pswOdyy6XLG3sQbJk6rJGgbTIyDvcNaT7e8bCkVpPHWT3Dq0pB8MikhVd_7nRxsAVw0ajazGR6LoZL_QQo4JWlmSSyMxQ41ezZRJ8KcZdwEzZF_zdW-4gi1gAnY-Tt4lKaDeZcfiG8m75LG5I6ypCOJrEZIb2TzhY2ffD-4Szlsm_63uR9nUZYY4wMBEOiCFol6sT0kVovP3cOUqyzdI_exyb8dbBgTOUTeZnNypV1IjKgHuQ35nw2imkjueYPd3Ky_dZFS4wWSEJELUaUNvD9744j56rIWcfth0rZ_4daO4TDDKbfV1zSnm59dqs6OQi7_Ou4C9gntu2VBshuRsucyqCKX66f9DRC0UhX_7XYtCKKK83fQn4kvRy2rXSyoeGIqhF0jkKempYf6dge-xOGgw3FZVntxQLg933qsYxoNV6_DtJDihnrXdYaUHXaRnLTf50tzZBQ3bVKqy8TnRr1UbrYNaW3F_wOEbJ2PocwH2qTC6_0ubzAYG4VWfreT7RuylYBgtDq6X2nmBbKajjv-Ni4-rdBi314f3FliyWfkkWpB5XH00b5KYZR5NqXba6ShkfKHH_vIb4wJN3SoMlB5lC2CsPSpGeJl2ODuNxdGFYaI1pxGxCgTCVtQzDwAyDcXiZX4zQmz-lQbRJnv7HLi-iuzRnw6HE4G9gqqgfng" ??
        "",
      initPhrase: `Запусти Викторина животных`,
      getState,
    });
  }
  return createAssistant({ getState });
};
function App() {
  const history = useHistory();
  const [solvedQuestions, setSolvedQuestions] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [text, setText] = useState("");
  const [sound, setSound] = useState("");
  const refAnswer = useRef();
  const refName = useRef();
  const processCard = () => {
    console.log("Ответ юзера", refAnswer.current);
    console.log("Ответ правильный", name);

    if (refAnswer.current === refName.current) {
      alert("Верно");
      generateNewAnimal();
      setAnswer("");
    } else {
      alert("Не верно");
    }
  };
  const generateNewAnimal = () => {
    getRandomAnimal(solvedQuestions).then((x) => {
      if (solvedQuestions == "") {
        setSolvedQuestions(solvedQuestions + `${x.id}`);
      } else {
        setSolvedQuestions(solvedQuestions + "," + `${x.id}`);
      }
      console.log(x);
      setPicture(x.picture);
      setName(x.name);
      setText(x.description);
      setSound(x.sound);
      refName.current = x.name;
    });
  };
  const [mode, setMode] = useState(0);
  const [playOrPractice, setPlayOrPractice] = useState(0);
  const [answer, setAnswer] = useState("");
  const assistant = useRef();
  useEffect(() => {
    //Инициализация ассистента
    assistant.current = initializeAssistant(() => getStateForAssistant());
    assistant.current.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

    assistant.current.on("data", (event /*: any*/) => {
      if (event.type == "smart_app_data") {
        console.log("User");
        console.log(event);
        if (event.sub != undefined) {
          console.log("Sub", event.sub);
        } else if (event.user_id != undefined) {
          console.log("UserId", event.user_id);
        }
      }
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
            case "легкий":
              setMode(0);
              history.push("/game");
              break;
            case "средний":
              setMode(1);
              history.push("/game");
              break;
            case "сложный":
              setMode(2);
              history.push("/game");
              break;
            default:
              break;
          }
          break;
        case "choose_level":
          switch (action.data) {
            case "легкий":
              setMode(0);
              history.push("/game");
              break;
            case "средний":
              setMode(1);
              history.push("/game");
              break;
            case "сложный":
              setMode(2);
              history.push("/game");
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
          setAnswer(action.data);
          refAnswer.current = action.data;
          break;
        case "send_answer":
          processCard();
          break;
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
          answer={answer}
          setAnswer={setAnswer}
          processCard={processCard}
          picture={picture}
          generateNewAnimal={generateNewAnimal}
          text={text}
          sound={sound}
        />
      </Route>
      <Route path="/">
        <Home
          setMode={setMode}
          setPlayOrPractice={setPlayOrPractice}
          playOrPractice={playOrPractice}
        />
      </Route>
    </Switch>
  );
}

export default withRouter(App);

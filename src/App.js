import Home from "./Home.js";
import Game from "./Game.js";
import { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState(0);
  const [playOrPractice, setPlayOrPractice] = useState(0);
  return (
    <Switch>
      <Route path="/game" exact>
        <Game mode={mode} playOrPractice={playOrPractice} />
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

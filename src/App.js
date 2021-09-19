import { BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./components/Home/Navbar";
import "./App.css";

function App() {
  return (
    <Router path="/">
      <Switch>
        <NavBar />
      </Switch>
    </Router>
  );
}

export default App;

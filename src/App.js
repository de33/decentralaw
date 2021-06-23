import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./Pages/Home";
import About from "./Pages/About";
import Roadmap from "./Pages/Roadmap";
import Quickstart from "./Pages/Quickstart";
import Explorer from "./Pages/Explorer";
import Navbar from "./Navbar";
import Editor from "./Pages/Editor";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/roadmap" exact component={Roadmap} />
        <Route path="/quickstart" exact component={Quickstart} />
        <Route path="/explorer" exact component={Explorer} />
        <Route path="/app" exact component={Editor} />
        <Route path="*" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;

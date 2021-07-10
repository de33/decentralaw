import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Roadmap from "./Pages/Roadmap";
import Quickstart from "./Pages/Quickstart";
import Explorer from "./Pages/Explorer";
import Editor from "./Pages/Editor";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import styled from "styled-components";
import { useState } from "react";
import Store from "./Store";
import Button from "react-bootstrap/Button";
import { ShakeSlow } from "reshake";

const NavUnlisted = styled.ul`
  display: flex;
  position: relative;
  background: white;
  padding: 2em;
  color: #1565c0;

  a {
    text-decoration: none;
  }

  li {
    //color: #fbb800;
    margin: 0 0.8rem;
    font-size: 1.5rem;
    position: relative;
    list-style: none;
    //text-shadow: 2px 1px #fbfb00;
  }

  .current {
    li {
      border-bottom: 2px solid #1565c0;
      //color: #b444dc;
      //text-shadow: 2px 1px #fbfb00;
    }
  }
`;

const WalletStyle = styled.div`
  display: inline-block;
  float: right;
  background: white;
`;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    31337, // hardhat
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    5, // Goerli
    42, // Kovan
  ],
});

const getLibrary = provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React();

  const onClick = () => {
    activate(injectedConnector);
  };

  return (
    <div>
      {active ? (
        <div>
          <div> ChainId: {chainId}</div>
          <div> Account: {account}</div>
          <div className="check">✅ </div>
        </div>
      ) : (
        <Button type="button" onClick={onClick}>
          Connect
        </Button>
      )}
    </div>
  );
};

const App = () => {
  // const [contracts, setContracts] = useState("");

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Store>
        <Router>
          <WalletStyle>
            <Wallet />
          </WalletStyle>
          <NavUnlisted>
            <ShakeSlow>
              <img src="/logo.png" className="logo" />
            </ShakeSlow>
            <NavLink exact to="/" activeClassName="current">
              <li>Home</li>
            </NavLink>
            <NavLink exact to="/about" activeClassName="current">
              <li>About</li>
            </NavLink>
            <NavLink exact to="/roadmap" activeClassName="current">
              <li>Roadmap</li>
            </NavLink>
            <NavLink exact to="/quickstart" activeClassName="current">
              <li>Quickstart</li>
            </NavLink>
            <NavLink exact to="/explorer" activeClassName="current">
              <li>Explorer</li>
            </NavLink>
            <NavLink exact to="/app" activeClassName="current">
              <li>Editor</li>
            </NavLink>
          </NavUnlisted>
          <div className="main">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/roadmap" exact component={Roadmap} />
              <Route path="/quickstart" exact component={Quickstart} />
              <Route path="/explorer" exact component={Explorer} />
              <Route path="/app" exact component={Editor} />
              <Route path="*" exact component={Home} />
            </Switch>
          </div>
        </Router>
      </Store>
    </Web3ReactProvider>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ethEnabled} from "./initializer"

if (!ethEnabled()) {
  alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// console.clear()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

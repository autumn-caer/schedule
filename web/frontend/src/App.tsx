import React from "react";
import { Provider } from "react-redux";
import { store } from "./practise02/state";
import RepositoriesList from './practise02/RepositoriesList'
// import EventComponent from './practise/events/EventComponent'
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Search for a Package</h1>
        <RepositoriesList/>
      </div>
    </Provider>
  );
}

export default App;

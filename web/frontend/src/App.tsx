import React from 'react'
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from 'react-redux'
import  {store } from './practise03/state' 
import CellList from './practise03/components/cell-list'

const App = () => {
 
  return (
    <Provider store={store}>
      <div>
        <CellList/>
      </div>
    </Provider>
  );
};

export default App
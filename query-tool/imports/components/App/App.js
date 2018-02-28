import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

// import reducers from '../../state/reducers';
import Game from '../Game/Game';
import ResultsContainer from '../Results/ResultsContainer';

// export const store = createStore(reducers, {});

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Game} />
      <Route path="/results" exact component={ResultsContainer} />
    </div>
  </BrowserRouter>
);

export default App;

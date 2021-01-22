/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: App
 */

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import store from './store';
import Col1 from './Col1';
import Col2 from './Col2';
import Col3 from './Col3';
import './styles/styles.scss';

function App() {
  const [focused, setFocused] = useState();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Redirect to="/create" />
        <Route path="/">
          <main className="grid-3">
            <Col1 setFocused={setFocused} />
            <Col2 focused={focused} setFocused={setFocused} />
            <Col3 focused={focused} />
          </main>
        </Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

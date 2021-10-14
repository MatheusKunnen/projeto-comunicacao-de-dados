import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './store/Store';

const AppWContext = () => (
  <StoreProvider>
    <App/>
  </StoreProvider>
)

ReactDOM.render(<AppWContext />, document.getElementById('root'));

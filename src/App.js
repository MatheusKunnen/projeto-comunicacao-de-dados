import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import { ThemeProvider } from '@material-ui/core';
import mainTheme from './styles/mainTheme';
import HomePage from './components/pages/HomePage';
import ServidorPage from './components/pages/ServidorPage';
import ClientePage from './components/pages/ClientePage';

function App() {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/servidor" component={ServidorPage} />
          <Route exact path="/cliente" component={ClientePage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

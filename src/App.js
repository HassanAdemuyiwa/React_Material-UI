import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/ui/Header';

import theme from './components/ui/Theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={() => <div>Home</div>} />
            <Route path="/services" component={() => <div>services</div>} />
            <Route path="/estimate" component={() => <div>Estimate</div>} />
            <Route path="/about" component={() => <div>About</div>} />
            <Route path="/websites" component={() => <div>Websites</div>} />
            <Route path="/contact" component={() => <div>Contact</div>} />
            <Route path="/mobileapps" component={() => <div>Mobile Apps</div>} />
            <Route path="/revolution" component={() => <div>revolution</div>} />
            <Route path="/customsoftware" component={() => <div>Custom Software</div>} />
           
          </Switch>

        </BrowserRouter>

      </ThemeProvider>
     
    </div>
  );
}

export default App;

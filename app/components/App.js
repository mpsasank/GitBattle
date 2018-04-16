import React from 'react';
import { BrowserRouter as Rounter, Route, Switch } from 'react-router-dom';
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Results from "./Results";
import Popular from './Popular';

class App extends React.Component {
  render() {
    return (
      <Rounter>
        <div className='container'>
          <Route render={( props ) => (props.location.pathname !== '/' ? <Nav /> : null)} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => {<p>Not Found</p>}} />
          </Switch>
        </div>
      </Rounter>
    )
  }
}

export default App;
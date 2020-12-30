import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import View from './Pages/View';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact  path="/" component={Home}
        />
        <Route  exact path="/day/:name" component={View} />

      </Switch>
    </Router>
  );
}

export default App;

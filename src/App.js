

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/home';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Home from './views/Home'

function App() {
  return (
    <Router path="/">
      <Switch>
        <Home />
      </Switch>
    </Router>
  )
}

export default App

import { 
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom'


import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Keys from './Pages/Keys'
import Projects from './Pages/Projects'
import Plans from './Pages/Plans'
import Wallet from './Pages/Wallet'
import Settings from './Pages/Settings'


const App = ()  => {

  return (
    <Router basename='/'>
      <Routes>
        <Route 
          path='/'
          element={<Home />}
        />
        <Route 
          path='/dashboard'
          element={<Dashboard />}
        />
        <Route 
          path='/keys'
          element={<Keys />}
        />
        <Route 
          path='/projects'
          element={<Projects />}
        />
        <Route 
          path='/plans'
          element={<Plans />}
        />
        <Route 
          path='/wallet'
          element={<Wallet />}
        />
        <Route 
          path='/settings'
          element={<Settings />}
        />
      </Routes>
    </Router>
  )
}

export default App


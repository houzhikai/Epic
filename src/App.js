import React, { Suspense, lazy } from 'react'
import './App.scss';
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'

import {
  Switch,
  Route
} from 'react-router-dom'


const Home = lazy(() => import('./pages/Home'))
const History = lazy(() => import('./pages/History'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/history' component={History} />
            <Route path='/about' component={About} />
            <Route path='/Login' component={Login} />
            <Route path='/Register' component={Register} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;

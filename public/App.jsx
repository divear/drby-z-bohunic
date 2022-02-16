import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import Home from './components/Home';
import NotFound from './components/NotFound';
import NovaZprava from './components/NovaZprava';
import Feedback from './components/Feedback';

function App() {
  return (
    <div className="App">
      <div onClick={() => window.location = "/"} className='header'>
        <h1 className='headerText'>Drby z Bohunic <br /><p><i>Naprosto anonymní</i></p></h1>
      </div>
      <div className='content'>
        <Router>
          <Routes>
            <Route path="/feedback" element={<Feedback />}></Route>
            <Route path="nova" element={<NovaZprava />}></Route>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </div>

    </div>
  );
}

export default App;

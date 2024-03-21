import './App.css';
import {Route, Routes} from "react-router-dom"
import NewGame from './pages/NewGame'
import GameChoice from './pages/GameChoice';
import SetGame from './pages/SetGame';
import Game from './pages/Game';
import EndGame from './pages/EndGame';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import { TokenContextProvider } from './context';

function App() {
  return (
    <TokenContextProvider>
      <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/newgame' exact element={<PrivateRoute Component={NewGame} />}/>
          <Route path='/gamechoice' element={<PrivateRoute Component={GameChoice} />} />
          <Route path='/setgame' element={<SetGame />} /> {/* No need to make these 3 private as they need special parameters that they can only get from the previous screen to run */}
          <Route path='/game' exact element={<Game />} />
          <Route path='/endgame' element={<EndGame />} />
      </Routes>
    </TokenContextProvider>
  );
}

export default App;

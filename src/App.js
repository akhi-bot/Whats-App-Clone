import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Switch,BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import {useStateValue} from './StateProvider'


function App() {
  const {user} = useStateValue()[0]
  
  return (
    // BEM Naming  convention
    <div className="app">
    {!user ? (
      <Login/>
    ):
      <div className="app__body">
        <Router>
          <Sidebar/>
          <Switch>
          <Route path="/rooms/:roomId"> 
              <Chat />
            </Route>
            <Route path="/">
                <h1>Home Page</h1>
            </Route>      
          </Switch>
        </Router>
      </div>}
    </div>
    );
}

export default App;


//  https://whats-app-clone-c7ac0.web.app
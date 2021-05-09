import AllMovies from "./components/allmovies";
import Navbar from "./components/navbar";
import MovieView from "./components/movieview";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nonauth from "./components/customcomponents/nonauth";
import useToken from './components/customhooks/useToken';
import "./reset.css";

function App() {
  const {token, setToken} = useToken();
  return(
    <Router>
        <Navbar token={{token, setToken}}/>
        <Switch>
          <Route path="/" exact>
              <AllMovies token={token}/>
          </Route>
          <Route path="/view/:id">
              <MovieView token={token}/>
          </Route>
          <Route path="/signin">
              {/* Nonauth is a custom component which checks if the user is logged in and makes the
              route inaccessible according to the login status  */}
              <Nonauth component={SignIn} setToken={setToken} token={token}/>
          </Route>
          <Route path="/signup">
              <Nonauth component={SignUp} token={token}/>
          </Route>
        </Switch>
    </Router>
  )
}

export default App;

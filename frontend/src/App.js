import React from 'react';
import  './styles/App.css';
import { Link , Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Signup from './SignUp';
import EmpDashBoard from './HeaderLogedEMP';
import MngrDashBoard from './HeaderLogedMNGER.js';

class App extends React.Component {
   render() {
      return (
         <div>
           <Header />
            <div className="home">
            <Link to="/Login">
              <button class="butt" id="butt1" variant="outlined">Log In</button>
            </Link>
            <Link to="/Signup">
              <button class="butt" id="butt2">Register</button>
            </Link>
            </div>
            <Footer />
         </div>
      );
   }
}


const Main = () => (
  <Switch>
    <Route exact path='/' component={App}></Route>
    <Route exact path='/Login' component={Login}></Route>
    <Route exact path='/Signup' component={Signup}></Route>
    <Route exact path='/EmpDashBoard' component={EmpDashBoard}></Route>
    <Route exact path='/MngDashBoard' component={MngrDashBoard}></Route>
  </Switch>
);

export default Main;
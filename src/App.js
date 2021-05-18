import React , {Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react"
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Search from './Search';
import Cart from './Cart';
import Forgot from './Forgot';
import CakeDetails from './CakeDetails';
import Checkout from './Checkout';
import axios from "axios"
import { connect } from "react-redux";
import ErrorBoundary from "./ErrorBoundary"

var SuspendedAdmin= React.lazy(()=>import('./Admin'))

function App(props) {
  useEffect(()=>{ 
    if (localStorage.token && !props.user){
      props.dispatch({
          type:"INVOKE_USER_DETAIL"
      })  
    }
  },[props.user]) //We want to prevent the call of componentdidupdate()

  return (
    <div >
        <ErrorBoundary>
        <Router>
          <Navbar/>
          <div style={{marginLeft:"30px", marginRight:"15px"}}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/forgot" exact component={Forgot} />
              <Route path="/search" exact component={Search} />
              <Route path="/cake/:cakeid" exact component={CakeDetails} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/admin" exact > 
              <Suspense fallback={<div>Loading..</div>}>
                <SuspendedAdmin />
              </Suspense>
              </Route>
              {localStorage?.checkout>0 && <Route path="/checkout" component={Checkout} />}
            </Switch>
          </div>
        </Router>
        </ErrorBoundary>
    </div>
  );
}

// export default App;
export default connect()(App)
// export default connect(function (state, props) {
//   return { 
//       totalCart: state?.cartData?.totalCart
//   }
// })(App)

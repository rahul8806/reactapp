import React , {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'jquery/dist/jquery.slim.min'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'

import "./reduxstore/store"
import {Provider} from 'react-redux'
import dmart from './reduxstore/store'
import axios from "axios"

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

var SuspendedAdmin= React.lazy(()=>import('./Admin'))
// axios.interceptors.request.use((config)=>{
//   var token = localStorage.token
//   if(token){
//     config.headers["authtoken"]=token
//   }
//   return config
// },(error)=>{
//   Promise.reject(error)
// })

// axios.interceptors.response.use((response)=>{
//   return response
// },(error)=>{
//   Promise.reject(error)
// })

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={dmart}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import {createStore, applyMiddleware} from "redux"
import reduser from "./reducers"
import {FirstMiddleWare} from "./middlewares"
import {logger} from "./middlewares"
import thunk from "redux-thunk"
import createSaga from "redux-saga"
import {RootSaga} from "./sagas"


//Before Middleware
//var store = createStore(reduser)

//After Middleware
var sagaMiddleware = createSaga()
// var middlewares= applyMiddleware(FirstMiddleWare)
// var middlewares= applyMiddleware(logger, sagaMiddleware)
var middlewares= applyMiddleware(sagaMiddleware, thunk)
// var middlewares= applyMiddleware(sagaMiddleware)
var store = createStore(reduser, middlewares)
{sagaMiddleware.run(RootSaga)}


// store.dispatch({
//     type: "login",
//     payload:{email:"rahulsrivastava095@gmail.com", name:"Rahul Prakash"}
// })

// console.log ("Before LOGIN", store.getState())
// store.dispatch({
//     type: "LOGIN",
//     payload:{email:"rahulsrivastava095@gmail.com", name:"Rahul Prakash"}
// })
// console.log ("After LOGIN", store.getState())

export default store
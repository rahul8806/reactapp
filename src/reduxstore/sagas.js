import axios from "axios"
import {call, put, select, takeEvery, all} from "redux-saga/effects"
// import { push } from 'react-router-redux';

function login(action) {
    return axios({
        url: process.env.REACT_APP_BASE_URL + "/api/login",
        method:"post",
        data:action.payload
    })    
}

function* LoginGenerator(action) {
    var result=yield call(login,action)
    console.log ("LoginGenerator ", result)
    //yield put(push('/'))
    if(result.data.token){
        yield put({type:"LOGIN_SUCCESS", payload:result.data})  
        localStorage.token= result.data.token
        localStorage.email=result.data.email
  
        // yield put({type:"REMOVE_ALL_CART"})
        // var state= yield select(function (state){ return state })
        // if (state?.user?.isloggedin)
        // {
        //     var resultCart=yield call(cart,action)
        //     if(resultCart?.data?.length>0){
        //         yield put({type:"CART", data:resultCart.data,totalCart:resultCart.totalCart,totalAmount:resultCart.totalAmount})
        //     }
        // }    
    }else{
        yield put({type:"LOGIN_FAILURE"})
    }
}

function cart(action) {
    localStorage.checkout=0

    return axios({
        url: process.env.REACT_APP_BASE_URL + "/api/cakecart",
        method:"post",
        headers: { authtoken : localStorage.token}
    }).then((response)=>{
        let qty=0
        let amount=0
        response.data.data.forEach(function (obj) {
            qty+=obj.quantity
            amount+=(obj.quantity*obj.price)                 
        });
        localStorage.checkout=1
        return {data:response.data.data,totalCart:qty,totalAmount:amount}
       })
}

function* CartGenerator(action) {
    var resultCart=yield call(cart,action)
    if(resultCart?.data?.length>0){
        yield put({type:"CART", data:resultCart.data,totalCart:resultCart.totalCart,totalAmount:resultCart.totalAmount})
    }else{
        yield put({type:"REMOVE_ALL_CART"})
    }
}

function addCart(action) {
    return axios({
        url: process.env.REACT_APP_BASE_URL + "/api/addcaketocart",
        method:"post",
        headers: { authtoken : localStorage.token},
        data:action.payload
    })    
}

function* AddCartGenerator(action) {
    var result=yield call(addCart,action)
    if(result.data){
        alert(result.data.message)
    // }else{
    //     yield put({type:"REMOVE_ALL_CART"})
    }
}

function userDetail(action) {
    return axios({
        url: process.env.REACT_APP_BASE_URL + "/api/getuserdetails",
        method:"get",
        headers: { authtoken : localStorage.token}
    })
}

function* userDetailGenerator(action) {
    var result=yield call(userDetail,action)
    if(result.data.data){
        yield put({type:"INITIALSE_USER", payload:result.data.data})
        yield put({type:"REMOVE_ALL_CART"})
        var state= yield select(function (state){ return state })
        if (state?.user?.isloggedin)
        {
            var resultCart=yield call(cart,action)
            if(resultCart?.data?.length>0){
                yield put({type:"CART", data:resultCart.data,totalCart:resultCart.totalCart,totalAmount:resultCart.totalAmount})
            }
        }    
    }else{
    }
}

function cartPayment(action) {
    return axios({
        url: process.env.REACT_APP_BASE_URL + "/api/addcakeorder",
        method:"post",
        headers: { authtoken : localStorage.token},
        data:action.payload
    })
}

function* cartPaymentGenerator(action) {
    var result=yield call(cartPayment,action)
    console.log ("cartPaymentGenerator",result)
    if(result?.data?.order){
        yield put({type:"PAYMENT_SUCCESS", payload:result.data.order})
        localStorage.step=3
    }else{
        yield put({type:"PAYMENT_FAILURE"})
    }
}

export function*  LoginSaga() {
    yield takeEvery('LOGIN', LoginGenerator)
}
export function*  CartSaga() {
    yield takeEvery('INVOKE_CART', CartGenerator)
}
export function*  UserDetailSaga() {
    yield takeEvery('INVOKE_USER_DETAIL', userDetailGenerator)
}
export function*  CartPaymentSaga() {
    yield takeEvery('INVOKE_CART_PAYMENT', cartPaymentGenerator)
}
export function*  RootSaga() {
    //yield all([LoginSaga()])
    yield all([LoginSaga(),CartSaga(),UserDetailSaga(),CartPaymentSaga()])
}


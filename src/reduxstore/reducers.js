//var demo = function(state, action){
var reduser = function(state={user:null}, action){
    switch(action.type){
        case "LOGIN":{
            state={...state}
            state["isfetching"]=true
            return state
        }
        case "LOGIN_SUCCESS":{
            state={...state}
            // state["user"]=action.payload
            // state["user"]={name:action.payload.name}
            state["user"]={email: action.payload.email, name: action.payload.name, role: action.payload.role, isloggedin:true}
            state["isfetching"]=false
            return state
        }
        case "LOGIN_FAILURE":{
            state={...state}
            state["isfetching"]=false
            return state
        }
        case "LOGOUT":{
            state={...state}
            localStorage.clear()
            // delete state["isloggedin"]
            delete state["user"]
            return state
        }
        case "INITIALSE_USER":{
            state={...state}
            // state["isloggedin"]=true
            state["user"]={email: action.payload.email, name: action.payload.name, role: action.payload.role, isloggedin:true}
            return state
        }
        case "CART":{
            state={...state}
            state["cartData"]={...state.cartData,data:action.data, totalCart:action.totalCart, totalAmount:action.totalAmount}
            return state
        }
        case "REMOVE_ALL_CART":{
            state={...state}
            delete state["cartData"]
            return state
        }
        case "CHECKOUT":{
            state={...state}

            let checkout={step:0, address:null}
            if (state?.cartData?.checkout?.length>0){
                if (state?.cartData?.checkout?.step<=action.step)
                    checkout.step=action.step
                else
                    checkout.step=state?.cartData?.checkout?.step
            }
            else{
                checkout.step=action.step
            }

            if (action?.address?.length>0)
                checkout.address=action.address
            else
                checkout.address=state?.cartData?.checkout?.address
            
            state["cartData"]={...state.cartData, checkout:checkout}
            console.log("CHECKOUT call ", state, action, checkout)
        
            return state
        }
        case "PAYMENT_SUCCESS":{
            state={...state}
            state["cartPayment"]={data: action.payload, isPayment:true}
            return state
        }
        case "PAYMENT_FAILURE":{
            state={...state}
            delete state["cartPayment"]
            return state
        }
        default :return state 
    }
}

export default reduser
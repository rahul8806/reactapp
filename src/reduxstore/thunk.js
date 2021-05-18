export function loginDispatch(props, user){
    console.log("thunk loginDispatch==>", user, props)
    return (dispatch, getState)=>{
        console.log("thunk loginDispatch 1==>", getState())
        var state = getState()
        props.dispatch({
            type:"LOGIN",
            payload:user
        })         
    } 
}

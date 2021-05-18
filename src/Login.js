
import {useEffect, useState} from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";    //using for passing extra/hold props from component
import { connect } from "react-redux";
import { loginDispatch } from "./reduxstore/thunk";
import { UserDetailSaga } from "./reduxstore/sagas";

function Login(props){
    var [errors, setError] = useState({});
    var [user, setUser] = useState({email: null, password: null});
    useEffect(()=>{ 
        if(props.loginstatus)
            props.history.push("/")
      },[props.loginstatus]) //We want to prevent the call of componentdidupdate()

   
    let getEmail =(event)=>{
        setUser({...user,
            email: event.target.value})
            setError(null)
    }
    let getPassword = (event)=>{
        setUser({...user,
            password: event.target.value})
            setError(null)
    }
    
    let isMailValid=()=>{
        if(user.email==null) return false;
        if(user.email)
        {
            var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if (user.email.match(format)) 
                return true
        }
        return false
    }

    let isValidate=()=>{
        let objError={}
        if (!isMailValid())
            objError.email="Invalid Email"
        if(!user.password)
            objError.password="Invalid Password"
    
        if(Object.keys(objError).length>0) {
            setError({...objError})
            return false
        }
        else
            return true
    }

    let login = ()=>{
        if(!isValidate()) return
        props.dispatch(loginDispatch(props, user)) 

        // if(props.loginstatus)
        // props.history.push("/")

        // props.dispatch({
        //     type:"LOGIN",
        //     payload:user
        // })         

        // axios({
        //          url: "https://apibyashu.herokuapp.com/api/login",
        //          method:"post",
        //          data:user
        //      }).then((response)=>{
        //         //  console.log("Response from signup api ", response.data)
        //          if (response.data.token){
        //              localStorage.token= response.data.token
        //              localStorage.email=response.data.email
        //              props.dispatch({
        //                  type:"LOGIN",
        //                  payload:response.data
        //              })
        //              setTotalCart();
        //             //  props.informlogin(localStorage);
        //              props.history.push("/")
        //          }
        //          else
        //             setError({error: response.data.message})
        //      }, (error)=>{
        //         console.log("api Error", error)
        //         setError({error: "Invalid Credential"})
        //      })
    }

    // //Total Cart
    // function setTotalCart() {
    //     axios({
    //         url: "https://apibyashu.herokuapp.com/api/cakecart",
    //         method:"post",
    //         headers: { authtoken : localStorage.token}
    //     }).then((response)=>{
    //         let qty=0
    //         response.data.data.forEach(function (obj) {
    //             qty++
    //         });
    //         localStorage.totalcart=qty
    //     }, (error)=>{
    //         console.log("Total Cart error ", error)
    //     })
    // }

    return(
        <div className="row">
        <div style={{width:"50%" , margin:"auto", padding:"15px", border:"2px solid"}}>
            <div className="text-center">
                <h2>Login</h2>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" id="txtEmail" className="form-control" onChange={getEmail}></input>
                {errors?.email?.length>0 && <label style={{color:"red"}}>{errors.email}</label>}
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" id="txtPassword" className="form-control" onChange={getPassword}></input>
                {errors?.password?.length>0 && <label style={{color:"red"}}>{errors.password}</label>}
            </div>
            <div style={{float:"right"}}>
                <Link to="/forgot">Forgot Password</Link>
            </div>
            <div>
                <Link to="/signup">New User? Click Here</Link>
            </div>
            <div className="text-center">
                <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
            {errors?.error?.length>0 && <div className="text-center" style={{color:"red"}}>{errors.error}</div>}
        </div>
        </div>
    )
}

// export default withRouter(Login)
Login =withRouter(Login)
// export default connect()(Login)
export default connect((state,props)=>{
    return { 
        loginstatus: state?.user?.isloggedin
    }
})(Login)


import {useEffect, useState} from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";    //using for passing extra/hold props from component

function Forgot(props){
    var [errors, setError] = useState({});
    var [user, setUser] = useState({email: null});

    let getEmail =(event)=>{
        setUser({email: event.target.value})
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

    let recovery = ()=>{
        if (!isMailValid())
        {
            setError({error: "Invalid Email"})
            return
        }

        axios({
                 url: "https://apibyashu.herokuapp.com/api/recoverpassword",
                 method:"post",
                 data:user
             }).then((response)=>{
                //  console.log("Response from signup api ", response.data)
                 if (response.data.token){
                     props.history.push("/login")
                 }
                 else
                    setError({error: response.data.message})
             }, (error)=>{
                console.log("api Error", error)
             })
    }

    return(
        <div className="row">
        <div style={{width:"50%" , margin:"auto", padding:"15px", border:"2px solid"}}>
            <div className="text-center">
                <h2>Recovery</h2>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" id="txtEmail" className="form-control" onChange={getEmail}></input>
                {errors?.email?.length>0 && <label style={{color:"red"}}>{errors.email}</label>}
            </div>
            <div className="text-center">
                <button className="btn btn-primary" onClick={recovery}>Recovery</button>
            </div>
            {errors?.error?.length>0 && <div className="text-center" style={{color:"red"}}>{errors.error}</div>}
        </div>
        </div>
    )
}

//export default Forgot
Forgot =withRouter(Forgot)
export default Forgot
import {useEffect, useState} from "react"
import { Link, withRouter } from "react-router-dom";    //using for passing extra/hold props from component
import { connect } from "react-redux";

function Address(props){
    var [errors, setError] = useState({});
    useEffect(()=>{ 
        //setUser({email:null, password:null})
        //alert("Mounted and Updated")
    },[]) //We want to prevent the call of componentdidupdate()

    // var [formerrors,setFormErrors] = useState({})

    // var validate= function (obj){
    //     // console.log("validate ", elements)
    //     var errors = {}
    //     // if (!elements.txtName.value){
    //     //     errors.name="Name is required"
    //     // }



    //     var errorkeys=Object.keys(errors)
    //     if(errorkeys.length>0)
    //         return errors
    //     else
    //         return false
    // }

    // var placeOrder=function () {
    //     // var form = document.getElementById('addressform')
    //     // console.log("Place Order ", form.elements, form.Object)
    //     // var errors= validate(form.elements)
    //     // if (errors)
    //     //     setFormErrors(errors)
    //     // else
    //     //     alert ("Form validate successfully")
    
    // }

    let isValidate=(obj)=>{
        let objError={}
        if(!obj.name)
            objError.name="Invalid Name"
        if(!obj.address)
            objError.address="Invalid Address"
        if(!obj.state)
            objError.state="Invalid State"
        if(!obj.city)
            objError.city="Invalid City"
        if(!obj.pincode)
            objError.pincode="Invalid Pincode"
        if(!obj.phone)
            objError.mobile="Invalid Mobile"
         console.log("ewrew", objError)
        if(Object.keys(objError).length>0) {
            setError({...objError})
            return false
        }
        else
            return true
    }

    let Next=()=>{
        var objAddress={
            name:document.getElementById('txtName').value,
            address:document.getElementById('txtAddress').value,
            state:document.getElementById('txtState').value,
            city:document.getElementById('txtCity').value,
            pincode:document.getElementById('txtPincode').value,
            phone:document.getElementById('txtMobile').value
        }

        if(!isValidate(objAddress)) return false
        // props.dispatch({
        //     type:"CHECKOUT",
        //     step:2,
        //     address:objAddress
        // })         

        localStorage.step=2
        // localStorage.cartAddress={...objAddress}
            localStorage.cartname=document.getElementById('txtName').value
            localStorage.cartaddress=document.getElementById('txtAddress').value
            localStorage.cartstate=document.getElementById('txtState').value
            localStorage.cartcity=document.getElementById('txtCity').value
            localStorage.cartpincode=document.getElementById('txtPincode').value
            localStorage.cartphone=document.getElementById('txtMobile').value

        console.log("Address localStorage ", localStorage,objAddress)
        props.history.push("payment")
    }
    

    return (
        <form id="addressform" >
            <div className="row">
                <div className="col text-center" style={{padding:"5px"}}>
                    <h4>Shipping Detail</h4>
                </div>
            </div>

            <div className="row border">                
                <div className="col-2 border">
                    Name
                </div>
                <div className="col-8 ">
                    <input className="form-control mr-sm-2" id="txtName" type="text" placeholder="Name" aria-label="Name" />
                    {errors?.name?.length>0 && <label style={{color:"red"}}>{errors.name}</label>}
                </div>
            </div>
            <div className="row border">                
                <div className="col-2 border">
                    Address
                </div>
                <div className="col-8 ">
                    <input className="form-control mr-sm-2" id="txtAddress" type="text" placeholder="Address" aria-label="Address" />
                    {errors?.address?.length>0 && <label style={{color:"red"}}>{errors.address}</label>}
                </div>
            </div>
            <div className="row border">                
                <div className="col-2 border">
                    State
                </div>
                <div className="col-4 ">
                    <input className="form-control mr-sm-2" id="txtState" type="text" placeholder="State" aria-label="State" />
                    {errors?.state?.length>0 && <label style={{color:"red"}}>{errors.state}</label>}
                </div>
                <div className="col-2 border">
                    City
                </div>
                <div className="col-4 ">
                    <input className="form-control mr-sm-2" id="txtCity" type="text" placeholder="City" aria-label="City" />
                    {errors?.city?.length>0 && <label style={{color:"red"}}>{errors.city}</label>}
                </div>
            </div>
            <div className="row border">                
                <div className="col-2 border">
                    Pincode
                </div>
                <div className="col-4 ">
                    <input className="form-control mr-sm-2" id="txtPincode" type="text" placeholder="Pincode" aria-label="Pincode" />
                    {errors?.pincode?.length>0 && <label style={{color:"red"}}>{errors.pincode}</label>}
                </div>
                <div className="col-2 border">
                    Mobile
                </div>
                <div className="col-4 ">
                    <input className="form-control mr-sm-2" id="txtMobile" type="text" placeholder="Mobile" aria-label="Mobile" />
                    {errors?.mobile?.length>0 && <label style={{color:"red"}}>{errors.mobile}</label>}
                </div>
            </div>
            <div className="row">                
                <div className="col text-center" style={{paddingTop:"10px"}}>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={Next}>Continue</button>
                </div>
                {/* <div className="col-6 text-center" style={{paddingTop:"10px"}}>
                    <button onClick={placeOrder} className="btn btn-outline-success my-2 my-sm-0" type="submit">Continue 1</button>
                </div> */}
            </div>
        </form>
    )
}

// export default Address
export default connect((state,props)=>{
    console.log("Address connect ", state)
    return { 
        address: state?.cartData?.checkout?.address
    }
})(Address)

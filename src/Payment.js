import {Link} from "react-router-dom"
import axios from "axios"
import {useEffect, useState} from "react"
import { connect } from "react-redux";

function Payment(props){
    console.log("Payment localStorage ", localStorage, props)
    useEffect(()=>{ 
        if(props?.isPayment)
        {
            localStorage.step=3
            props.history.push("order")
        }
      },[props]) //We want to prevent the call of componentdidupdate()
    
    let Next=()=>{
        props.dispatch({
            type:"INVOKE_CART_PAYMENT",
            payload: {price:props?.cartData?.totalAmount, name:localStorage.cartname, address:localStorage.cartaddress, city:localStorage.cartcity, phone:localStorage.cartphone,pincode:localStorage.cartpincode,cakes:props?.cartData?.data}
        })         

        // axios({
        //     url: "https://apibyashu.herokuapp.com/api/addcakeorder",
        //     method:"post",
        //     headers: { authtoken : localStorage.token},
        //     // data: {email:localStorage.email, cakeid:event.target.getAttribute("itemid")}
        //     data: {price:props?.cartData?.totalAmount , name:localStorage.cartname , address:localStorage.cartaddress, city:localStorage.cartcity, phone:localStorage.cartphone,pincode:localStorage.cartpincode,cakes:props?.cartData?.data}
        // }).then((response)=>{
        //     localStorage.step=3
        //     alert("Order placed successfully")
        // }, (error)=>{
        //     console.log("remove api error ", error)
        // })
    }

    return (
        <div className="row">                
        <div className="col text-center" style={{paddingTop:"10px"}}>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={Next}>Pay Now</button>        </div>
    </div>
    )
}
// export default Payment
export default connect((state,props)=>{
    return { 
        cartData: state?.cartData,
        cartPayment: state?.cartPayment?.data,
        isPayment: state?.cartPayment?.isPayment
    }
})(Payment)
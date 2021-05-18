import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from "react-redux";

const shoppingcartIcon=<FontAwesomeIcon icon={faShoppingCart} />

function CartSummary(props){
    // console.log("CartSummary localStorage ", localStorage)
  
    var [cartData, setCartData] = useState()
    var [totalCart, setTotalCart] = useState({})
    useEffect(()=>{ 
        let apiurl="https://apibyashu.herokuapp.com/api/cakecart"
        var token = localStorage.token
        axios({
                 url: apiurl,
                 method:"post",
                 headers: { authtoken : token}
             }).then((response)=>{
                 console.log("success ", response.data)
                 setCartData(response.data.data)
                 let qty=0
                 let price=0
                 response.data.data.forEach(function (obj) {
                     qty++
                     price= price + obj.price                     
                 });
                 setTotalCart({qty: qty, price: price})
             }, (error)=>{
                 console.log("error ", error)
             })

    },[]) //We want to prevent the call of componentdidupdate()
 
    let Next=()=>{
        props.dispatch({
            type:"CHECKOUT",
            step:1
        })         

        localStorage.step=1
    }

    return(
        <div >
            <div className="row">
                <div className="col text-center" style={{padding:"5px"}}>
                    <h4><FontAwesomeIcon icon={faShoppingCart} /> Cart Summary</h4>
                </div>
            </div>
            <div className="row">                
                <div className="col-1 border text-center">
                    <b>Image</b>
                </div>
                <div className="col-7 border">
                    <b>Item</b>
                </div>
                <div className="col-4 border">
                    <b>Amount</b>
                </div>
            </div>

            {cartData?.length>0 ?
                <div>
                    <div className="row">
                        <div className="col">
                            {/* must be pass key */}
                            {cartData?.length>0 && cartData.map((obj, index)=>{
                                return (
                                    <div className="row">                
                                        <div className="col-1 border text-center">
                                            <img src={obj.image} className="card-img-top" alt="..." />
                                        </div>
                                        <div className="col-7 border">
                                            {obj.name}
                                        </div>
                                        <div className="col-4 border">
                                            {obj.price}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        </div>                
                    
                        <div className="row border">                
                            <div className="col-6 border text-center">
                                <b>Total Item</b><br /> {totalCart?.qty}
                            </div>
                            <div className="col-6 border text-center">
                                <b>Total Price</b><br /> {totalCart?.price}
                            </div>
                        </div>
                        <div className="row">                
                            <div className="col text-center" style={{paddingTop:"10px"}}>
                                <Link to="checkout/address"> <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={Next}>Continue</button></Link>
                            </div>
                        </div>
                </div>
                :<div className="row">
                    <div className="col border text-center red">
                        No item added!
                    </div>
                </div>
            }
        </div>
    )
}

// export default CartSummary
export default connect()(CartSummary)

import {useEffect, useState} from "react"
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import axios from "axios"
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const shoppingcartIcon=<FontAwesomeIcon icon={faShoppingCart} />

function Cart(props){
    localStorage.step=0
    // // console.log("error ", error)
    // var [cartData, setCartData] = useState()
    // var [totalCart, setTotalCart] = useState({})
    useEffect(()=>{ 
         getCart()
    },[]) //We want to prevent the call of componentdidupdate()

    function getCart() {
        props.dispatch({
            type:"INVOKE_CART"
        })         

        // axios({
        //          url: "https://apibyashu.herokuapp.com/api/cakecart",
        //          method:"post",
        //          headers: { authtoken : localStorage.token}
        //      }).then((response)=>{
        //          console.log("success ", response.data)
        //          setCartData(response.data.data)
        //          let qty=0
        //          let price=0
        //          response.data.data.forEach(function (obj) {
        //              qty++
        //              price= price + obj.price                     
        //          });
        //          setTotalCart({qty: qty, price: price})
        //          localStorage.totalcart=qty
        //         }, (error)=>{
        //          console.log("error ", error)
        //      })
    }

    // function remove (event) {
    function remove (obj) {
        console.log("remove ", obj)
        //event.preventDefault();
        axios({
            url: "https://apibyashu.herokuapp.com/api/removecakefromcart",
            method:"post",
            headers: { authtoken : localStorage.token},
            // data: {email:localStorage.email, cakeid:event.target.getAttribute("itemid")}
            data: {email:localStorage.email, cakeid:obj.cakeid}
        }).then((response)=>{
            console.log("remove api ", response.data)
            getCart()
        }, (error)=>{
            console.log("remove api error ", error)
        })
}

    let checkout=function (event) {
        event.preventDefault();
        alert("Call Checkout Function....")
    }
    
    return(
        <div >
            <div className="row">
                <div className="col text-center" style={{padding:"5px"}}>
                    <h4><FontAwesomeIcon icon={faShoppingCart} /> My Cart</h4>
                </div>
            </div>


            {props?.cartData?.data?.length>0 ?
                <div className="row">
                    <div className="col-8">
                        <div className="row">                
                            <div className="col-1 border text-center">
                                <b>Image</b>
                            </div>
                            <div className="col-6 border">
                                <b>Item</b>
                            </div>
                            <div className="col-3 border">
                                <b>Amount</b>
                            </div>
                            <div className="col-2 border">
                                &nbsp;
                            </div>
                        </div>

                        {props?.cartData?.data?.length>0 && props?.cartData?.data?.map((obj, index)=>{
                            return (
                                <div className="row">                
                                    <div className="col-1 border text-center">
                                        <img src={obj.image} className="card-img-top" alt="..." />
                                    </div>
                                    <div className="col-6 border">
                                        {obj.name}
                                    </div>
                                    <div className="col-3 border">
                                        {obj.price}
                                    </div>
                                    <div className="col-2 border">
                                        <button onClick={remove.bind(null,obj)} itemID={obj.cakeid} className="btn btn-danger my-2 my-sm-0" type="submit">Remove</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-4">
                        <div className="row border">                
                            <div className="col-6 text-center">
                                <b>Total Item</b><br /> {props?.cartData?.totalCart}
                            </div>
                            <div className="col-6 text-center">
                                <b>Total Price</b><br /> {props?.cartData?.totalAmount}
                            </div>
                        </div>
                        {props?.cartData?.totalCart>0 && <div className="row">                
                            <div className="col text-right" style={{paddingTop:"10px"}}>
                                <Link to="checkout"> <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Checkout</button></Link>
                            </div>
                        </div>}
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

// export default Cart
//mapstatetoprops
export default connect(function (state, props) {
    return { 
        cartData: state?.cartData
    }
})(Cart)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { connect } from "react-redux";

const star = <FontAwesomeIcon icon={faStar} />
const heart = <FontAwesomeIcon icon={faHeart} />
function CakeDetails(props){
    let params = useParams()
    var [cakedata, setCakeData] = useState({});
    useEffect(()=>{ 
        let apiurl="https://apibyashu.herokuapp.com/api/cake/"+params.cakeid
        axios({
                 url: apiurl,
                 method:"get"
             }).then((response)=>{
                 setCakeData(response.data.data)
                 console.log("Cake Details response.data.data ", response.data)
             }, (error)=>{
                 console.log("error ", error)
             })
    },[useParams()]) //We want to prevent the call of componentdidupdate()

    let addtocart= function () {
        let apiurl="https://apibyashu.herokuapp.com/api/addcaketocart"
        var token = localStorage.token
        axios({
                url: apiurl,
                method:"post",
                headers: { authtoken : token},
                data:{
                    cakeid:cakedata.cakeid, 
                    name:cakedata.name, 
                    image:cakedata.image, 
                    price:cakedata.price,
                    weight:cakedata.weight}
            }).then((response)=>{
                props.dispatch({
                    type:"INVOKE_CART"
                })                 
                alert(response.data.message)
            }, (error)=>{
                console.log("api Error", error)
            })
    }
    return(
        <div className="card" style={{margin: "20px 140px"}}>
        <div className="card-body" style={{backgroundColor: "rgba(0,0,0,.03)"}}>
            <div className="row">
                <div className="col-sm-6">
                    <div style={{margin: "10px 60px"}}>
                        <img src={cakedata.image} 
                        className="card-img-top" alt="..." height="700px" />
                    </div>

                </div>
                <div className="col-sm-6">
                    <div style={{margin: "10px 20px"}}>
                        <h1 className="text-uppercase font-weight-bold pt-5 pb-3">{cakedata.name}</h1>
                        <div className="pb-3">
                            <span className="text-warning">{star} 4.5</span>
                            <br/><span style={{fontSize: "18px"}}>{cakedata.reviews} reviews</span>
                        </div>
                        <div className="pb-3">{cakedata.description}</div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Current price: 
                            <span className="text-warning"> ${cakedata.price}</span>
                            </span>
                        </div>
                        <div className="pb-3"><span className="font-weight-bold">91%</span> of user enjoyed this product!
                            <span className="font-weight-bold"> (87 votes)</span>
                        </div>

                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Weight: {cakedata.weight}KG</span></div>
                        <div className="pb-3" style={{fontSize: "25px"}}><span className="text-uppercase font-weight-bold">Flavour: 
                                <span className="font-italic text-warning"> {cakedata.flavour}</span>
                            </span>
                        </div>

                        <div className="pb-3 text-uppercase" style={{fontSize: "23px"}}><span className="font-weight-bold">type</span><br/>{cakedata.type}</div>

                        
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-sm-6">
                    <div className="font-weight-bold" style={{fontSize: "18px"}}>Ingredient:</div>
                    <div style={{fontSize: "16px"}}>cream | chocolate | dark chocolate | hazelnut | strawberry</div>
                    
                </div>
                {localStorage?.token && <div className="col-sm-6" style={{fontSize: "20px"}}>
                    <button onClick={addtocart} type="button" className="btn btn-warning text-uppercase p-3 text-white mr-2 font-weight-bold">Add to cart</button>
                    <button type="button" className="btn btn-warning p-3 text-white font-weight-bold">{heart}</button>
                </div>}
            </div>
        </div>
        </div>
    )
}
export default connect()(CakeDetails);
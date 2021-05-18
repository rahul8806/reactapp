import {useContext} from "react"
import {DiscountContext} from "./Home"
function Cake(props){
    const context = useContext(DiscountContext)
    console.log("cake--->",context)
    return(
        <div className="card col-md-3" style={{ width:"18rem", cursor: "pointer", marginBottom: "10px"}}>
            <a href={"/cake/"+props.cakedata.cakeid}><img src={props.cakedata.image} className="card-img-top" alt="..." 
                title={props.cakedata.name} style={{height: "200px", paddingTop: "10px"}} /></a>
            <div className="card-body"><h5 className="card-title text-center" >{props.cakedata.name}</h5>
            </div>
        </div>
    )
}
export default Cake
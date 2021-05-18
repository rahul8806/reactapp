import { useRouteMatch, Route, Link } from "react-router-dom"
import CartSummary from './CartSummary';
import Address from './Address';
import Payment from './Payment';
import Order from './Order';

function Checkout()
{
    console.log("Checkout localStorage ", localStorage)
    var route= useRouteMatch()
    var url = route.url
    var path = route.path

    return (
    
        <div className="row border">
            <div className="col-4 border">
                <Link to={url}><li>Cart Summary</li></Link>
                {localStorage?.step>=1 ?<Link to={url+"/address"}><li >Address</li></Link>:<li >Address</li>}
                {localStorage?.step>=2 ?<Link to={url+"/payment"}><li >Payment</li></Link>:<li >Payment</li>}
                {localStorage?.step>=3 ?<Link to={url+"/order"}><li >Order</li></Link>:<li >Order</li>}
                {/* <Link to={url+"/order"}><li >Order</li></Link> */}
            </div>
            <div className="col-8 border">
                <Route exact path={path} component={CartSummary} />
                {localStorage?.step>=1 && <Route exact path={path+"/address"} component={Address} />}
                {localStorage?.step>=2 && <Route exact path={path+"/payment"} component={Payment} />}
                {localStorage?.step>=3 && <Route exact path={path+"/order"} component={Order} />}
                {/* <Route exact path={path+"/order"} component={Order} /> */}
            </div>
        </div>
      );
}

export default Checkout
import { propTypes } from "react-bootstrap/esm/Image";
import { Link, withRouter } from "react-router-dom";    //using for passing extra/hold props from component
import {useLocation} from 'react-router-dom'  //we can use useloacation
import { connect } from "react-redux";
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const shoppingcartIcon=<FontAwesomeIcon icon={faShoppingCart} />
const searchIcon=<FontAwesomeIcon icon={faSearch} />

function Navbar(props) {
    var count=0;
    let search = function(event)
    {
        event.preventDefault();
        // count++;
        // //console.log("Search happening", event)
        
        let url = "/search?searchtext=" + document.getElementById('txtSearch').value;
        props.history.push(url)
    }

    let logout = function()
    {
        props.dispatch({
            type:"LOGOUT"
        })
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/"><a className="navbar-brand" href="#">My Cake</a></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" id="txtSearch" type="search" placeholder="Search" aria-label="Search" />
            <button onClick={search} className="btn btn-outline-success my-2 my-sm-0" type="submit"><FontAwesomeIcon icon={faSearch } /></button>

            { props.loginstatus ? <div>
                <Link to="/cart"><button  class="btn btn-warning my-2 my-sm-0" type="submit">
                <FontAwesomeIcon icon={faShoppingCart} /><b>{props?.totalCart}</b></button></Link>

                <Link to="/"><button onClick={logout} className="btn btn-danger" type="submit">Logout</button></Link>
                </div>:<div>
                    <Link to="/login">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </Link>
                </div>
            }
            </form>
        </div>
        </nav>
    );
  }
  
//   export default withRouter(Navbar)

Navbar =withRouter(Navbar)
//mapstatetoprops
export default connect(function (state, props) {
    return { 
        //user: state && state["user"]["name"],
        //loginstaus: state && state["isloggedin"]
       
        user: state?.user?.name,
        loginstatus: state?.user?.isloggedin,
        totalCart: state?.cartData?.totalCart
    }
})(Navbar)
  
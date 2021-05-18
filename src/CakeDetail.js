
function CakeDetail(props){
    return(
        <div className="row">
            <div class="col-md-6">
                <img src={props.cakedata.image} className="card-img" alt="..." style={{width: "30rem", height:"250px"}} />
            </div>

            <div class="col-md-6">
                <h5>{props.cakedata.name}</h5>
                {/* <ul class="rating">
                <li>
                    <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                    <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                    <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                    <i class="fas fa-star fa-sm text-primary"></i>
                </li>
                <li>
                    <i class="far fa-star fa-sm text-primary"></i>
                </li>
                </ul> */}
                <p class="pt-1">A special filled cake for a party of 20 people.</p>
                <p><span class="mr-1"><strong>Current Price: ${props.cakedata.price}</strong></span></p>
                <p class="pt-1">91% of buyes enjoyed this product. (87 Votes)</p>

                <button type="button" class="btn btn-primary btn-md mr-1 mb-2 waves-effect waves-light">Buy now</button>
                <button type="button" class="btn btn-light btn-md mr-1 mb-2 waves-effect waves-light"><i class="fas fa-shopping-cart pr-2"></i>Add to
                cart</button>
            </div>
         </div>
    )
}

export default CakeDetail
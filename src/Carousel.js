var carousel1 = "carousel1.jpg";
var carousel2 = "carousel2.jpg";
var carousel3 = "carousel3.jpg";

var carouselImage = {
    height:"200px"
}

function Carousel() {
    return (
        <div style={{margin:"1px"}}>
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                <div class="carousel-item active">
                    <img style={carouselImage} src={carousel1} class="d-block w-100" alt="..." /> 
                </div>
                <div class="carousel-item">
                    <img style={carouselImage} src={carousel2} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                    <img style={carouselImage} src={carousel3} class="d-block w-100" alt="..." />
                </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
                </a>
            </div>  
        </div>  
      );
  }
  
  export default Carousel
  
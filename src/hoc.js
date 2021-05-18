//High Order Component
import {Component} from "react"
function  HOC(Comp) {
    return class extends Component{
        render(){
            return(
                <div>
                    This is our Logic
                    <Comp />
                </div>
            )
        }
    }
}
import {Component} from "react"
class ErrorBoundary extends Component{
    constructor(){
        super()
        this.state={hasError:false}
    }

    static getDerivedStateFromError(error){
        return {hasError:true}
    }

    componentDidCatch(error, errorInfo){}

    render(){
        if(this.state.hasError){
            return(
            <div> 
                <h1>Oops! Some Error Occured</h1>
                </div>
            )
        }        
        else
        {
            return (this.props.children)
        }
    }
}

export default ErrorBoundary

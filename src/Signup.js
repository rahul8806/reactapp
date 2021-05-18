import {Component} from "react"
import axios from "axios"

class Signup extends Component {

    constructor(){
        super()
        this.state = {onlineUsers:0}
    }
   
    user = { }
    // goOnline=()=>{
    //     console.log("........", this)
    //     this.setState({
    //         onlineUsers:this.state.onlineUsers+1
    //     })
    // }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    componentWillUnmount(){

    }

    getEmail =(event)=>{
        this.user.email = event.target.value
    }
    getName =(event)=>{
        this.user.name = event.target.value
    }
    getPassword = (event)=>{
        this.user.password = event.target.value
    }
    register = ()=>{
        if(!this.user.email || !this.user.password|| !this.user.name){
            this.setState({
                errorMessage:"Please Fill Details"
            })
        }
        else{
        //    this.setState({
        //        errorMessage:null
        //    })
           let apiurl="https://apibyashu.herokuapp.com/api/register"
           axios({
                    url: apiurl,
                    method:"post",
                    data:this.user

                }).then((response)=>{
                    console.log("Response from signup api ", response.data)
                }, (error)=>{
                    console.log("Response from signup api ", error)
                })
        }
        console.log("...... user details" , this.user)
    }

    render() {

        return(
            <div className="row">
                <div style={{width:"50%" , margin:"auto", padding:"15px", border:"2px solid"}}>
                    <div className="text-center">
                        <h2>New User</h2>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                    <input type="email" class="form-control" onChange={this.getEmail}></input>
                    </div>
                    <div className="form-group">
                        <label>user</label>
                    <input type="text" class="form-control" onChange={this.getName}></input>
                    </div>
                    <div className="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" onChange={this.getPassword}></input>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={this.register}>Register</button>
                    </div>
                    {this.state?.errorMessage?.length>0 && <div className="text-center" style={{color:"red"}}>{this.state.errorMessage}</div>}
                </div>
            </div>
        )

    }
}

export default Signup
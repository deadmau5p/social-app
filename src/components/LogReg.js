/*import React from "react"
import Login from "./Login"
import Register from "./Register"

class LogReg extends React.Component
{

    constructor()
    {
        super()
        this.state = {
           
            logOn: true
        }
    }

    toggle()
    {
        console.log("heere")
        this.setState((prev) =>({
            logOn: !prev.logOn
        }))
    }

    render(){
        return(<div>{this.state.logOn ? <Login setU={this.props.setU} click={this.toggle.bind(this)}/> : <Register setU={this.props.setU}/>}</div>)
       
    }
}

export default LogReg;*/
import React from "react"
import Navbar from "./Navbar"
import Home from "./Home"
import {Route,Redirect} from "react-router-dom"
import Profile from "./Profile"
import Register from "./Register"
import Login from "./Login"



class UserView extends React.Component{
    constructor()
    {
        super()
        this.state = {
            loginView: true,
            user: {},
        }
        this.setUser = this.setUser.bind(this )
        this.changeLog = this.changeLog.bind(this)
    }


    setUser(e, obj)
    {
        console.log(obj.username)
       
        this.setState({
            user:obj,
            loginView:false
        })
        
        
    }
    changeLog(event)
    {
        console.log("heej")
        this.setState({
            user:{}, 
            loginView:true
        })
    }

    


    render()
    {
        return(<div style={{height:"100%"}}>
            <Navbar log={this.state.loginView} logout={this.changeLog}/>
            <Route path={`/user/:userId`}>
                <Profile user={this.state.user}/>
            </Route>
            
            <Route exact path="/home">
                {console.log(this.state.user.username)}
                <Home user={this.state.user}/>
            </Route>
            <Route path="/login">
                {console.log(this.state.loginView)}
                {this.state.loginView ? <Login click={this.setUser}/> : <Redirect to="/home" />}
            </Route>
            <Route path="/register" >
            {this.state.loginView ? <Register setU={this.setUser} /> : <Redirect to="/" />}
            </Route>
        </div>)
    }
}

export default UserView;
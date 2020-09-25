import {Link} from "react-router-dom"

import React from "react"


class Login extends React.Component
{

    constructor()
    {
        super()
        this.state = {
            users : {},
            email:'',
            password:'',
            message: "",

        }
        this.onChange = this.onChange.bind(this);
        this.checkAuto = this.checkAuto.bind(this)
    }



    componentDidMount() {
        
        fetch("http://localhost:5000/login")
        .then(res => res.json())
        .then(
            (result) => {
               console.log(result)
               this.setState({
                   users:result
               })
            },
            (error) => {
                console.log('error');
            }
        )
        
    }

    checkAuto(event)
    {
        
        event.preventDefault()
        var userArray = this.state.users;
        
        console.log(userArray)
        for(var i = 0; i < userArray.length;i++)
        {
            console.log("ehe")
            if((userArray[i].email)===(this.state.email))
            {
                console.log("not here")
                console.log(userArray[i].password);
                console.log(this.state.password)
                if(userArray[i].password === (this.state.password))
                {
                    console.log("here")
                    this.props.click(event, userArray[i]);
                    
                }
            }
        }
        
    }

    onChange(event)
    {
        const target = event.target;
        const value =target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        

    }

    render()
    {
        return(
        <div className="form">
            <h1>Please login</h1>
            <form onSubmit={this.checkAuto} >
            
                <input 
                type="text" 
                name="email" 
                onChange={this.onChange}  
                placeholder="Your email*" 
                value={this.state.email}
                />
            
                <input 
                type="password" 
                name="password"  
                onChange={this.onChange} 
                placeholder="Your password*" 
                value={this.state.password}
                />

                <div className="log-message">
                    <button type="submit" >Login</button>
                    <span >{this.state.message}</span>
                </div>
                
                <br/><br/>
                <p>or</p>
        
    
            </form>
            <Link to="/register"><button type="button" className="btn btn-dark" >Register</button></Link>
        </div>)
    }
    
}

export default Login;
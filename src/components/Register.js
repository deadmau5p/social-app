import React from "react"

class Register extends React.Component
{

    constructor()
    {
        super()
        this.state = {
            email:"",
            username: "",
            password:"",
            name:"",
            last_name:"",
            users:{}

        }
        this.onChange = this.onChange.bind(this);
        this.postToServer = this.postToServer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    postToServer()
    {
        
        fetch("http://localhost:5000/register", {
            method:'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                username:this.state.username,
                email:this.state.email,
                password:this.state.password,
                name:this.state.name,
                last_name:this.state.last_name
            })
        })
        .then(res => res.json())
        .catch(error => {
            
            console.error('There was an error!', error);
        });
        
        
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

    checkUnique()
    {
        
        for(var i = 0; i < this.state.users.length;i++)
        {
            if(this.state.users[i].username === this.state.username || this.state.users[i].email === this.state.email)
            {
               
                return false;
            }
        }
        
        return true  ;
    }

    onSubmit(e)
    {
        e.preventDefault()
        var unique = this.checkUnique();

        if(unique)
        {
            this.postToServer();
        }
        
    }


    onChange(e)
    {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }

    render()
    {

        return(
        <form className="form" onSubmit={this.onSubmit}>
            <h1>Register right now!</h1>
            
            <input 
            type="text" 
            placeholder="Email" 
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            />
       
            <input 
            type="password" 
            placeholder="Password" 
            value={this.state.password}
            onChange={this.onChange}
            name="password"
            />
    
        
            <input 
            type="text" 
            placeholder="username" 
            value={this.state.username}
            name="username"
            onChange={this.onChange}
            />

            <input 
            type="text" 
            placeholder="name" 
            value={this.state.name}
            name="name"
            onChange={this.onChange}
            />

            <input 
            type="text" 
            placeholder="Last name" 
            value={this.state.last_name}
            name="last_name"
            onChange={this.onChange}
            />

        <button type="submit">Register</button>
       
    </form>)
    }
}

export default Register;
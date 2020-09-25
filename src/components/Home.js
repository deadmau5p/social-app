import React from "react"
import Bio from "./Bio"
import Feed from "./Feed"
import Message_box from "./Message_box";

class Home extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            users:[],
            chatP: null,
            clicked:false,

        }
        this.onClick= this.onClick.bind(this);
    }

    onClick(user)
    {
        
        this.setState({
            chatP:user,
            clicked:true
        })
    }

    clicked()
    {
        this.setState((prev) => {
            return({clicked: !prev.clicked})
        })
    }


    componentDidMount()
    {
        fetch("http://localhost:5000/users")
        .then(res=>res.json())
        .then(
            (result) => {
                
                this.setState({
                    users:result
                })
            }
        )
        .catch(error => {
            console.log("There was an error!", error)
        })
    }

    render()
    {
        var seznam = "";

        if(this.state.users.length > 0)
        {
            seznam = (this.state.users).map((user) => 
            <button className="chat-btn" onClick={() => this.onClick(user)} >{user.username}</button>
            )
        }

        console.log(this.props.user)

        if(this.props.user.username === undefined)
        {
            return "";
        }
        
        return(<div className="front">
            <div className="bio">
                
                <Bio user={this.props.user} />
            </div>
            <div className="feed">
                <Feed />
            </div>
            {this.state.chatP !== null ? (
            <div className="mes-con">
            <Message_box 
            onClick={this.clicked.bind(this)}  
            clicked={this.state.clicked} 
            user2={this.state.chatP} 
            user1={this.props.user}/>
            </div>) : null}
            
            <div className="dropup">
                <button className="dropbtn">Chat with friends</button>
                <div className="dropup-content">
                    {seznam}
                </div>
            </div>
            
        </div>)
    }
}

export default Home;

/**/ 
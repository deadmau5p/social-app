
import React from "react"


 export default class Message_box extends React.Component
{

    constructor()
    {
        super()
        this.state={
            chat: [],
            mess_con:"" 
            
        }
        this.refBox = React.createRef();
        
    }

    onSubmit(e)
    {
        
    }

    onClick()
    {
        this.setState((prev) =>{
           return({clicked: !prev.clicked})
        })
    }

    scrollToBottom = () => {
        this.refBox.current.scrollIntoView({ behavior: 'smooth' })
    }
    

    componentDidMount()
    {
        fetch(`http://localhost:5000/chat/${this.props.user1.idUser}`, {
            method:'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
               idUser2:this.props.user2.idUser
            })
        })
        .then(res => res.json())
        .then((result)  => {
            console.log(result)
            this.setState({
                chat:result
            })
         })
        .catch(error => {
            
            console.error('There was an error!', error);
        });

        this.scrollToBottom();
    }
    componentDidUpdate()
    {
        this.scrollToBottom();
    }

    

    render()
    {

        
        var vsi = this.state.chat.map((mess) => {
        if(mess.idsender === this.props.user1.idUser)
        {
            return(<div className="message blue">{mess.content}</div>)
        }
        return(<div className="message green">{mess.content}</div>)
    })
        
        if(!this.props.clicked)
        {
            
            return "";
        }
        return(
        <div className="mes-box">
            <div style={{display:"block"}}>
            <p style={{display:"inline-block"}}>
                Your chat with {this.props.user2.username}
            </p>
            <button style={{
                backgroundColor:"#f0f2f5",
                marginLeft:"10px",
                border:"none",
                height:"5px"
            }}
            onClick={this.props.onClick}>x</button>
            </div>
            
            <div className="mes-win">
                {vsi}
                <div ref={this.refBox}></div>
            </div>
            <div className="mes-in">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <textarea placeholder="Send"/>
                    <button type="submit" id="mes-btn">Send</button>
                </form>
                
            </div>
        </div>);
    }
}


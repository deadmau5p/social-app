
import React from "react"
import {Link} from "react-router-dom"

class Bio extends React.Component
{
    

    constructor()
    {
        super()
        this.state = {
            userBio : []
        }
    }

    componentDidMount()
    {
        console.log(this.props.user.username)
        fetch("http://localhost:5000/user", {
            method:'POST',
            headers: {'Content-Type':'application/json', 'Accept':'application/json'},
            body: JSON.stringify({
                userId:this.props.user.idUser
            })
        })
        .then(res=>res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({
                    userBio:result
                })
            }
        )
        .catch(error => {
            console.log("There was an error!", error)
        })
    }

    render()
    {
        console.log(this.state.userBio[0])
        return(<div style={{height:"100%"}}>
            {this.state.userBio[0] === undefined ?  "" : console.log(this.state.userBio[0].image)}
            <img className="profile-pic" src="/aljaz_prof.jpg"></img>
            <div className="text">
                <h2>
                    {this.state.userBio[0] === undefined ? "" : this.state.userBio[0].first_name  + " " + this.state.userBio[0].last_name}
                </h2>
            </div>
            <div style={{alignItems:"center"}}>
                {this.state.userBio[0] === undefined ?  null : <Link to={"/user/" + this.state.userBio[0].iduser_bio}><button className="btn-to-profile">See your profile</button></Link>}
            </div>
            
            
        </div>)
    }
}

export default Bio;
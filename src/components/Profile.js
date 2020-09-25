import React from "react"
import PostList from "./PostList"

class Profile extends React.Component
{

    constructor()
    {
        super()
        this.state = {
            user :[],
            loaded: false,
            posts: []
        }
    }
    componentDidMount()
    {
        console.log(this.props.user.idUser)
        fetch(`http://localhost:5000/user/${this.props.user.idUser}`)
        .then(res=>res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({
                    user:result
                })
            }
        )
        .catch(error => {
            console.log("There was an error!", error)
        })

        fetch(`http://localhost:5000/posts/${this.props.user.idUser}`)
        .then(res=>res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({
                    posts:result
                })
            }
        )
        .catch(error => {
            console.log("There was an error!", error)
        })

    }

    render()
    {

        if(this.state.user[0] === undefined)
        {
            return "";
        }
        return(
        <div className="prof-page">
            <h1>Welcome to {this.state.user[0].first_name}'s spot on the street.</h1>
            
            <img id="prof-img" src="https://cdn.guidingtech.com/imager/assets/2019/10/240876/Launch-Chrome-Incognito-Mode-Featured_4d470f76dc99e18ad75087b1b8410ea9.webp"></img>
            <div className="prof-list"><PostList list={this.state.posts}/></div>
            
            
        </div>)
    }
}

export default Profile;
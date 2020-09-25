import React from "react"
import icons from "../glyphicons/glyphicons.js"
import {Link} from "react-router-dom"

class ListItem extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            liked : false,
            likes : this.props.post.likes,
            showCom:false,
            comments: []
        }
        this.onClick = this.onClick.bind(this);
        this.changeLikes = this.changeLikes.bind(this);
        this.fetchCom = this.fetchCom.bind(this);


    }


    onClick()
    {
        this.setState((prev) => {
            return ({liked : !prev.liked})
        })

        this.changeLikes()


    }

    changeComm()
    {
        
        this.setState((prev) => {
            return({showCom: !prev.showCom})
        })
        this.fetchCom();
    }

    changeLikes()
    {
        var k = 1;
        if(this.state.liked === true)k = -1;
        fetch("http://localhost:5000/likepost", {
            method:'POST',
            headers: {'Content-Type':'application/json', 'Accept':'application/json'},
            body: JSON.stringify({
                postId : this.props.post.idpost,
                likes: this.state.likes + k
            })
        })
        .then(this.setState({
            likes : this.state.likes +k 
        }))
        
        .catch(error => {
            console.log(error);
        })
        
    }

    fetchCom()
    {
        
        fetch(`http://localhost:5000/comment/${this.props.post.idpost}`)
        .then(res => res.json())
        .then((result) => {this.setState({
                comments: result
        })})
        .catch(error => {
            console.log("There was an error!", error)
        })
    }


    render(){
        
        if(this.state.showCom)
        {
            
            

            var comments = this.state.comments.map((comment) => {
            return(<div className="comment" ><span className="com-a">{comment.content}</span><span>{comment.username}</span> </div>)
            })
        }
        
        
        
        return(
        <div className="post_item">
            <div className="post-v">
                <Link className="link-p" to={`/user/${this.props.post.idAut}`}><p id="usern">{this.props.post.username}</p></Link>
                <div >
                    <p id="content">{this.props.post.caption}</p>
            
                    {this.props.post.type === 2 ? <img className="post-pic" alt="post" src={this.props.post.img_url}></img>: null}
                </div>
                <div className="likes">
                        <button className="like" type="button" onClick={this.onClick}>
                            {(this.state.liked ? <div ><span >{icons.heartBlue}</span>Dislike </div>:<div ><span>{icons.heartBlue}</span> Like</div>)}
                        </button>
                
                        <span className="num-lik">Likes : {this.state.likes}</span>
                
                
                </div>
                
            </div>
        <button  onClick={this.changeComm.bind(this)} className="com-btn" ><span className="plus">{this.state.showCom? "-" : "+"}</span></button>
            <div className="com-contain">
            
            {this.state.showCom ?
                comments
                :""
            }

            </div>
        </div>)
    }
}

export default ListItem;
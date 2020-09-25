import React from "react"
import PostList from "./PostList"
import pic from "../camera.png"

class Feed extends React.Component
{

    constructor()
    {
        super();
        this.state = {
            file_mes: "",
            posts : [],
            img: "",


        }

        this.input = React.createRef();
        this.inputField = this.inputField.bind(this);
    }

    componentDidMount()
    {
        
        fetch("http://localhost:5000/posts")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({
                    posts : result
                })
            },
            (error) => {
                console.log(error);
            }
        )

        

    }

    inputField()
    {
        this.input.current.click();
    }

    render()
    {



        return(<div style={{height:"100%"}} >
                <div className="post-box">
                    <input  id="today" placeholder="What are you thinking about today?" />
                    <div className="file-btn" role="button" onClick={this.inputField} ><span><img className="file-btn-i" src={pic}></img></span>Add a photo</div>
                    <input style={{display:"none"}} type="file" ref={this.input}/>
                    <button style=
                        {{
                            backgroundColor:"#F5FFFA",
                            border: "solid #87CEEB 2px",
                            float:"right",
                            width:"20%"
                            
                
                         }} 
                        type="submit">
                        Post
                    </button>
                </div>
                <div style={{height:"100%"}}>
                    <PostList list={this.state.posts}/>
                </div>
            </div>)
    }
}

export default Feed;
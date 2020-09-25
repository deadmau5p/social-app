import React from "react"

import ListItem from "./ListItem"

class PostList extends React.Component
{
     

    render()
    {
        var seznam = (this.props.list).map((item) => 
            <ListItem post={item} key={item.idpost}/>
        )


        return(<div className="post_list">
            {seznam}
        </div>)
    }
}

export default PostList;
import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {PostContext} from "../../Context/PostContext";

function PostPage(props) {
    const posts = useContext(PostContext);
    const params = useParams();

    useEffect(() => {
        console.log(posts);
    }, [])

    return (
        <div className="list-of-posts">

        </div>
    );
}

export default PostPage;
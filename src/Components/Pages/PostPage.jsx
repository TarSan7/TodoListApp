import React from 'react';
import {useParams} from "react-router-dom";

function PostPage() {
    const params = useParams();

    return (
        <div>
            Here is a post {params.id}
        </div>
    );
}

export default PostPage;
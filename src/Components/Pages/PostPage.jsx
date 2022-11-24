import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { useLocation } from 'react-router-dom';

function PostPage() {
    // const posts = queryClient.getQueryData('posts');
    const params = useParams();
    const { state } = useLocation();

    return (
        <div>
            <h1>{ state.title }</h1>
            <div className="list-of-posts">
                <div className="post-content">
                    <img src="https://picsum.photos/200/300" className="image"/>
                    <div className="full-width">
                        <span className="post-text"> { state.selftext } </span>
                        <div className="post-content">
                            <div className="post-text"> { state.subreddit } </div>
                            <div className="post-text">Author: { state.author } </div>
                            <div className="post-text">Reddit <a href={ state.url }>Link</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;
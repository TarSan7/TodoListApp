import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { ReactComponent as Logo } from '../../images/light.svg';
import { ColorRing } from 'react-loader-spinner';
import {useQuery} from "react-query";

function Blog() {
    const limit = 1000;
    const { data, isLoading, isError, error } = useQuery('posts', fetchData);

    function fetchData() {
        return fetch('https://www.reddit.com/r/Norway.json')
            .then(response => response.json())
            .then(response => response.data.children.map(child => {
                return {
                    "id": child.data.id,
                    "subreddit": child.data.subreddit,
                    "selftext": child.data.selftext
                        ? child.data.selftext.slice(0, limit) + "..."
                        : "No info in the post",
                    "author": child.data.author,
                    "title": child.data.title,
                    "url": child.data.url,
                };
            }));
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                { isLoading && <div className="spinner">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>}
                { isError && <div className="list-of-posts error">{ error.message }</div>}
                { data && data.map((post) => (
                    <li key={ post.id } className="list-of-posts">
                        <Logo className="light"/>
                        <Link
                            to={`/blog/${ post.id }`}
                            state={post}
                            className="list-of-posts-text"
                        >
                            { post.title }
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blog;
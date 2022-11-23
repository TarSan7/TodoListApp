import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { ReactComponent as Logo } from '../../images/light.svg'
import {PostContext} from "../../Context/PostContext";
import { ColorRing } from 'react-loader-spinner'

function Blog() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://www.reddit.com/r/Norway.json')
            .then(response => response.json())
            .then(response => setPosts(response.data.children.map(child => {
                return {
                    "id": child.data.id,
                    "subreddit": child.data.subreddit,
                    "selftext": child.data.selftext,
                    "author": child.data.author,
                    "title": child.data.title,
                    "url": child.data.url,
                };
            })))
            .then(() => setIsLoading(false))
            .catch((err) => {
                setError(err.message)
                setIsLoading(false)
            });
    }, [])

    return (
        <PostContext.Provider value={ posts }>
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
                    { error
                        ? <div className="list-of-posts error">{ error }</div>
                        : posts.map((post) => (
                        <li key={ post.id } className="list-of-posts">
                            <Logo className="light"/>
                            <Link
                                to={`/blog/${ post.id }`}
                                className="list-of-posts-text"
                            >
                                { post.title }
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </PostContext.Provider>
    );
}

export default Blog;
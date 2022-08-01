import React from 'react'; 
import axios from 'axios';
import {useEffect} from 'react';
import BlogPost from './BlogPost';
import "./../../styling/blog.css";


var backend_root_url = require("./../../info.json").backend_root_url;
var blog_api_route = "/blog";




function Blog() {
    const [current_typed_input, set_current_typed_input] = React.useState("");
    const [blog_posts, set_posts] = React.useState([]);
    var post_components = blog_posts.map(post => <BlogPost username={post.UserUsername} text={post.text}/>);
    const fetch_posts = () => {
        axios.get(backend_root_url + blog_api_route).then((response) => {
            console.log("method called");
            console.log(response);
            set_posts(old_posts => response.data);
        });

    };

    useEffect(fetch_posts, []);
    const submit_blog = (blog_text) => {
        let current_user = localStorage.getItem("username");
        if (current_user != null){
            axios.post(backend_root_url + blog_api_route, {
                UserUsername : current_user, 
                text: blog_text}). then((response) => {
                    console.log(response);
                    fetch_posts();
                }).catch((err) => {
                    console.log(err);
                })
        }

    }
    return (
        <div className = "Blog">
            <h1>Blog</h1>
            <h3>Log in to post about how much you love Erin</h3>
        
            {localStorage.getItem("username") != null ? <> 
                <input placeholder="I love Erin" onChange={(event) => set_current_typed_input(event.target.value)}></input>
                <button onClick={() => {submit_blog(current_typed_input);}}>Post</button>
                </> : <></>}


            {post_components}
        
        </div>
    );
};

export default Blog;
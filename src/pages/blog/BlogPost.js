import "./../../styling/blog.css"

function BlogPost(props) {

    return (
        <div className="BlogPost">
            <p>{props.text}</p>
            <h6>from: {props.username}</h6>
        </div>
  );
  }
  
  export default BlogPost;
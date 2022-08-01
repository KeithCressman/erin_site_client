import "./../../styling/quiz_page.css";

function Question(props) {
    return (
        <div className="Question">
          <p>{props.question}</p>
        </div>
  );
  }
  
  export default Question;
import "./../../styling/quiz_page.css";



//a custom element for displaying a single answer choice to a question

function Answer_Option(props) {
      return (
          <div className="Answer-Option" onClick = {() => props.handle_click(props.answer)}>
            <p className= "Answer-Text">{props.answer}</p>
          </div>
    );
    }
    
export default Answer_Option;

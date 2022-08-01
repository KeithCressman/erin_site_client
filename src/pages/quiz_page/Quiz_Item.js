//element consisting of a question, and answer choices, plus some functionality to submit an answer
import Question from "../quiz_page/Question";
import Answer_Option from "../quiz_page/Answer_Option";
import "./../../styling/quiz_page.css";

function Quiz_Item(props){

    var options = props.question_data.options;
    var question_prompt = props.question_data.question;
    var correct = props.question_data.correct;
    var correct_answer = props.question_data.options[correct];

    var option_components = options.map(option => <Answer_Option answer={option} handle_click={handle_answer}/>);
    
    function handle_answer(submitted_answer){
        if (submitted_answer == correct_answer){
            props.update_progress(true);
        } else{
            props.update_progress(false);
        }
    }

    return (
        <div className="Quiz-Item">
        <Question question={question_prompt}/>
        {option_components}
        </div>
    );

}
export default Quiz_Item;
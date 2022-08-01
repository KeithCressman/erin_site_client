
import React from "react";
import { useEffect, useContext } from 'react';
import { UserContext } from "./../../contexts/UserContext";

import Quiz_Item from "./Quiz_Item";
import "./../../styling/quiz_page.css";
import axios from "axios";

var backend_root_url = require("./../../info.json").backend_root_url;
var leaderboard_api_route = "/questions";
var finish_quiz_api_route = "/finishquiz";

function Quiz_Page(){

  const {curr_user} = useContext(UserContext);
  const [quiz_over, set_quiz_over] = React.useState(false);
  const [progress, set_progress] = React.useState([0, 0]);
  const [questions, set_questions] = React.useState([{
    "question":"What is Erin's favorite color?",
    "options":[
        "Teal",
        "Pastel blue",
        "Dark green",
        "Purple"
    ],
    "correct": 1
}]);
  let num_questions = 5;

  const initialize_questions = (questions_data) => {
    //set_questions(old_questions => questions_data.data.questions);
    set_questions(questions_data.data.questions);
    console.log("qjasldf");
    console.log(questions_data.data.questions);
    console.log(questions);
  };

  const fetch_questions = () => {
    console.log("eeffecting");
    axios.post(backend_root_url + leaderboard_api_route, {"num_questions" : num_questions}).then((questions_data) => {
      initialize_questions(questions_data);
    }).catch((error) => {console.log(error)});
  };

  useEffect(() => {fetch_questions();}, []);
  
  function update_progress(correct_answer){
    if (correct_answer){
      set_progress(old_progress => [old_progress[0] + 1, old_progress[1] + 1]);
    }
    else {
      set_progress(old_progress => [old_progress[0], old_progress[1] + 1]);
    }
    console.log(progress[1]);
    if (progress[1] >= (num_questions - 1)){
      console.log("wtf");
      let quiz_results = {username : curr_user, correct : progress[0], total : num_questions};
      axios.post(backend_root_url + finish_quiz_api_route, quiz_results).then((data) => {
        console.log(data);
        set_quiz_over(true);
      }).catch((error) => {
        console.log(error);
        set_quiz_over(true);
      });
    
    }

  }

  const evaluate_score = (num_correct, total) => {
    if (total > num_correct){
      return (<p>LESS THAN 100%?? FAKE FAN</p>);
    } else {
      return (<p>Nice try, you probably cheated</p>)
    }
  };

  return (
    <div className="Quiz-Page">
      <h1>
        Do you really know Erin? Take the quiz to find out
      </h1>
      <h3>
        Your current score: {progress[0]} / {progress[1]}
      </h3>

      {
      progress[1] >= num_questions ? 
      <>
      <h4>Quiz is over</h4>
      <p>
      {
        evaluate_score(progress[0], progress[1])
      }
      </p>
      </>
       :
      <Quiz_Item question_data={questions[progress[1]]} update_progress={update_progress} />
      }


    </div>
  );
}
  
export default Quiz_Page;
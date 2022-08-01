import "./../../styling/leaderboard.css";

function Leader(props) {
    return (
        <div className="Leader">
          <h6>{props.username}</h6>
          <p>Erin Score: {props.erin_score}</p>
        </div>
  );
  }
  
  export default Leader;
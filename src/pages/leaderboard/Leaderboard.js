import React from 'react'; 
import axios from 'axios';
import {useEffect} from 'react';

import "./../../styling/leaderboard.css";
import Leader from "./Leader.js";

var backend_root_url = require("./../../info.json").backend_root_url;
var leaderboard_api_route = "/leaders";

console.log(backend_root_url);

function Leaderboard() {
    const [leaders, set_leaders] = React.useState([]);
    var leader_components = leaders.map(leader => <Leader username={leader.username} erin_score={leader.erin_score}/>);
    const fetch_leaders = () => {
        axios.get(backend_root_url + leaderboard_api_route).then((response) => {
            set_leaders(old_leaders => response.data);
        });

    };

    useEffect(fetch_leaders, []);

    return (
        <div className="Leaderboard">
            <h1>Leaderboard</h1>
            <h2>Who are Erin's real fans, and who is fake?</h2>
            {leader_components}
        </div>
    );
};

export default Leaderboard;
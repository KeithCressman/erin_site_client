import React from "react";
import { useContext } from 'react';
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

import { UserContext } from "./../../contexts/UserContext";

const Navbar = () => {
	const curr_user = localStorage.getItem("username");
	return (
		<>
		<Nav>
			<NavMenu>
			<NavLink to="/">
				Home
			</NavLink>
			<NavLink to="/quiz" >
				Quiz 
			</NavLink>
			<NavLink to="/blog" > Blog </NavLink>
			<NavLink to="/leaderboard" >LeaderBoard</NavLink>
			{(curr_user == null || curr_user.length < 1) ?  
			<><NavLink to="/login" >Login</NavLink>
			<NavLink to="/register" >Register</NavLink></> : <></>}

			</NavMenu>
		</Nav>
		</>
	);
};

export default Navbar;

import React from 'react';
import './styling/App.css';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/Home';
import Quiz_Page from './pages/quiz_page/Quiz_Page';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Blog from './pages/blog/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContext } from './contexts/UserContext';


function App() {
	const [curr_user, set_curr_user] = React.useState(localStorage.getItem("username"));

	return (
		<Router>
	<Navbar element={<UserContext.Provider value={{curr_user, set_curr_user}}></UserContext.Provider>}/>
		<Routes>
			<Route exact path='/' element={<Home />} />
			<Route path='/quiz' element={<UserContext.Provider value={{curr_user, set_curr_user}}>
				<Quiz_Page/>
				</UserContext.Provider>}/>
			<Route path='/blog' element={<Blog />}/>
			<Route path ='/leaderboard' element={<Leaderboard />} />
			<Route path='/login' element={<UserContext.Provider value={{curr_user, set_curr_user}}>
				<Login/>
				</UserContext.Provider>}/>
			<Route path='/register' element={<UserContext.Provider value={{curr_user, set_curr_user}}>
				<Register/>
				</UserContext.Provider>}/>
		</Routes>
	<Footer />
		</Router>

	);
}

export default App;


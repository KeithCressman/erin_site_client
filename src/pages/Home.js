import React from 'react'; 
import './../styling/App.css';

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={require('./../styling/images/erin_selfie.jpg')} className="App-logo" alt="logo" />
        <p>
          Welcome to the Erin fan club!
        </p>
      </header>
    </div>
  );
};

export default Home;
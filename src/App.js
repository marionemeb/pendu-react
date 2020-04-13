import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './App.scss';

import LetterBtn from './components/LetterBtn';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.resetBuilder = this.resetBuilder.bind(this);
    this.getWord = this.getWord.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.computeDisplay = this.computeDisplay.bind(this);
  }

  get initialState() {
    return {
      nbError: 0,
      selected: null,
      riddle: "SUPERMAN",
      usedLetters: [],
      penduLetters: "",
    };
  }

  resetBuilder() {
    this.setState(this.initialState);
  }

  getWord(){
    this.resetBuilder()
    //random heros
    const random = Math.floor(Math.random() * (731 - 1 + 1)) + 1;
    // Send the request
    axios.get('https://www.superheroapi.com/api.php/2849522908416243/' + random)
    // Extract the DATA from the received response
    .then(response => response.data)
    // Use this data to update the state
    .then(data => {
      console.log(data);
      this.setState({
        riddle: data.name.toUpperCase(),
      });
    });
  }

  handleClick = (e) => {
    this.setState({ 
        usedLetters: this.state.usedLetters.concat(e),
    })
  }

  componentDidMount(){
    setInterval(
      () => this.computeDisplay(),
      500
    );
  }

  computeDisplay() {  
    this.setState({ penduLetters: this.state.riddle.replace(/\w/g, (letter) => (this.state.usedLetters.includes(letter) ? letter : '_'))})
    let count = 0;
    for (let i=0 ; i < this.state.usedLetters.length; i++){
      count = this.state.riddle.includes(this.state.usedLetters[i]) ? count : count+1
    }
    this.setState({ nbError: count})
  }

  render(){

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    return (
      <div className="App">
        <h1>Jeu du Pendu... Version Super Heros!</h1>
        <p>Le jeu consiste à trouver le nom d'un super héro ou super vilain en devinant quelles sont les lettres qui le composent. <br />
        Attention, tu n'auras que 9 essais, ensuite la partie sera perdue!</p>

        {/* The riddle */}
        <button onClick={this.getWord}>Générer un nouveau nom</button>

        <div className="riddle">
          {this.state.penduLetters ? this.state.penduLetters : this.state.riddle.replace(/\w/g, '_')}
        </div>

        {/* ListLetters */}
        <h2>Sélectionnez des lettres afin d'afficher le mot mistère</h2>
        {letters.map( letter => 
          <LetterBtn 
          onClick={this.handleClick}
          isSelected={this.state.usedLetters.includes(letter)}
          key={letter}
          index={letter}
          name={letter}
          />)
        }

        {/* Pendu image */}
        <div className="pendu">
          <div className="table">
            <div id="img-1" className={this.state.nbError < 1 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-2" className={this.state.nbError < 2 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-3" className={this.state.nbError < 3 ? "pendu-hidden" : "pendu-not-hidden"}></div>
          </div>
          <div className="table">
            <div id="img-4" className={this.state.nbError < 4 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-5" className={this.state.nbError < 5 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-6" className={this.state.nbError < 6 ? "pendu-hidden" : "pendu-not-hidden"}></div>
          </div>
          <div className="table">
            <div id="img-7" className={this.state.nbError < 7 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-8" className={this.state.nbError < 8 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-9" className={this.state.nbError < 9 ? "pendu-hidden" : "pendu-not-hidden"}></div>
          </div>
        </div>
      
      </div>
      );
    }
}
    
export default App;
    
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './App.scss';

let nbError = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    // this.state = {
    //   class: false,
    //   letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    //   riddle: "SUPERMAN",
    //   usedLetters: [],
    //   penduLetters: "",
    // };
    this.resetBuilder = this.resetBuilder.bind(this);
    this.getWord = this.getWord.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClassNameChange = this.handleClassNameChange.bind(this);
    this.computeDisplay = this.computeDisplay.bind(this);
  }

  get initialState() {
    return {
      selected: false,
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
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
        usedLetters: this.state.usedLetters.concat(e)
    })
    this.handleClassNameChange(e)
  }

  handleClassNameChange = (e) => {
    console.log(document.getElementById(e))
    document.getElementById(e).setAttribute("class", "selected");
    nbError = this.state.riddle.includes(e)? nbError : nbError + 1;
    console.log(nbError)
  }

  componentDidMount(){
    setInterval(
      () => this.computeDisplay(),
      500
    );
  }

  computeDisplay() {  
    this.setState({ penduLetters: this.state.riddle.replace(/\w/g, (letter) => (this.state.usedLetters.includes(letter) ? letter : '_')  )})
  }

  render(){

    // for( var i=1; i<= nbError;i++){
    //   document.getElementsByClassName("img-"+{i}).setAttribute()
    //   console.log(document.getElementsByClassName("img-"+{i}))
    // }

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

        {/* The alphabet */}
        <h2>Sélectionnez des lettres afin d'afficher le mot mistère</h2>
        {this.state.letters.map( letter => 
          <button 
          onClick={(e) => this.handleClick(letter, e)}
          className={this.state.selected ? "selected" : ""} 
          key={letter}
          id={letter}>
            {letter}
          </button>)
        }

        {/* Pendu image */}
        <div className="pendu">
          <div className="table">
            <div className={"col-4 img-1 pendu-hidden"}></div>
            <div className={"col-4 img-2 pendu-hidden"}></div>
            <div className={"col-4 img-3 pendu-hidden"}></div>
          </div>
          <div className="table">
            <div className={"col-4 img-4 pendu-hidden"}></div>
            <div className={"col-4 img-5 pendu-hidden"}></div>
            <div className={"col-4 img-6 pendu-hidden"}></div>
          </div>
          <div className="table">
            <div className={"col-4 img-7 pendu-hidden"}></div>
            <div className={"col-4 img-8 pendu-hidden"}></div>
            <div className={"col-4 img-9 pendu-hidden"}></div>
          </div>
        </div>
      
      </div>
      );
    }
}
    
export default App;
    
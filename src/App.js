import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppBD.css';
import './App.scss';

import LetterBtn from './components/LetterBtn';
import Pendu from './components/Pendu';
import Riddle from './components/Riddle';
import Popup from './components/Popup';

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
      riddle: "",
      avatar:"",
      usedLetters: [],
      penduLetters: "",
      aliases: "",
      race: "",
      biography: "",
      publisher: ""
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
    axios.get('https://www.superheroapi.com/api.php/' + process.env.REACT_APP_APIKEY + '/' + random)
    // Extract the DATA from the received response
    .then(response => response.data)
    // Use this data to update the state
    .then(data => {
      this.setState({
        riddle: data.name.replace(/\d/g,"").toUpperCase(),
        avatar: data.image.url,
        aliases: data.biography.aliases,
        race: data.appearance.race,
        publisher: data.biography.publisher,
        biography: data.biography.alignment
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

    let compare = "overlay";
    if(this.state.usedLetters.length > 0 ){
      compare = this.state.riddle.localeCompare(this.state.penduLetters) ? "overlay" :"pop-up"
    }

    return (
      <div className="App">
        {/* The header */}
        <div className="panel pendu-header">
          <h1 className="text top-left">Jeu du Pendu...</h1>
          <p>Le jeu consiste à trouver le nom d'un super héro ou super vilain en devinant quelles sont les lettres qui le composent. <br />
          Attention, tu n'auras que 10 essais, ensuite la partie sera perdue!</p>
          <h2 className="text bottom-right">Version Super Héros!</h2>
        </div>

        <div className="pendu-body">
        
        {/* The riddle */}
        <Riddle penduLetters={this.state.penduLetters} riddle={this.state.riddle} avatar={this.state.avatar}>
          <h2 className="speech">Génère un nom de super héro</h2>
          <button onClick={this.getWord} className="styled">Jouer !</button>
        </Riddle>

        {/* Letters */}
        <div className="letters panel">
        <h2 className="text top-left">Choix des lettres</h2>
        {letters.map( letter => 
          <LetterBtn 
          onClick={this.handleClick}
          isSelected={this.state.usedLetters.includes(letter)}
          key={letter}
          index={letter}
          name={letter}
          />)
        }
        </div>
        

        {/* Pendu image */}
        <Pendu errors={this.state.nbError}/>
        
        {/* Counter*/}
        <div className="counter panel">
          <h2 className="timer count-title count-number" data-to="100" data-speed="1500">{10 - this.state.nbError}</h2>
          <p className="count-text ">{this.state.nbError <10 ? "Essais restants" : "Essai restant"}</p>
        </div>

        </div>

        {/* Pop-up*/}
        <div className={this.state.nbError < 10 && compare === "overlay" ? "overlay" : "pop-up"}>
          <div className="popup">
            <a className="close" href="" onClick={this.resetBuilder}>&#10008;</a>
            <Popup 
            nbError={this.state.nbError}
            name={this.state.riddle} 
            alias={this.state.aliases[0]}
            race={this.state.race}
            univers={this.state.publisher}
            super={this.state.biography} />
          </div>
        </div>
        
      </div>
      );
    }
}
    
export default App;
    
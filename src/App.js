import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppBD.css';
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
    axios.get('https://www.superheroapi.com/api.php/2849522908416243/' + random)
    // Extract the DATA from the received response
    .then(response => response.data)
    // Use this data to update the state
    .then(data => {
      this.setState({
        riddle: data.name.toUpperCase(),
        avatar: data.image.url,
        aliases: data.biography.aliases,
        race: data.appearance.race,
        publisher: data.appearance.publisher,
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
        <div className="pendu-riddle panel">
          <h2 className="speech">Génère un nom de super héro</h2>
          <button onClick={this.getWord} className="styled">Jouer !</button>

          <div className="riddle">
            {this.state.penduLetters ? this.state.penduLetters : this.state.riddle.replace(/\w/g, '_')}
          </div>
          <img src={this.state.avatar} alt={this.state.penduLetters} className="avatar"/>
        </div>

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
        <div className="panel">
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
        <p className="text bottom-right">THE END</p>
        </div>
        
        {/* Counter*/}
        <div className="counter panel">
          <h2 className="timer count-title count-number" data-to="100" data-speed="1500">{10 - this.state.nbError}</h2>
          <p className="count-text ">{this.state.nbError <10 ? "Essais restants" : "Essai restant"}</p>
        </div>
        </div>

        {/* Pop-up LOOSE*/}
        <div className={this.state.nbError < 10 ? "overlay" : "pop-up"}>
          <div className="popup">
            <h2>PERDU !</h2>
            <a className="close" href="" onClick={this.resetBuilder}>&#10008;</a>
            <div className="content">
              <h4>Retentes ta chance...</h4>
              <p>Nom: {this.state.riddle}<br/>
                  Alias : {this.state.aliases[0]}<br/>
                  Race : {this.state.race}<br/>
                  Produit : {this.state.publisher}<br/>
                  Super {this.state.biography === "good" ? "Héro" : "Vilain"}
              </p>
            </div>
          </div>
        </div>

        {/* Pop-up WIN*/}
        <div className={ compare}>
          <div className="popup">
            <h2>GAGNE !</h2>
            <a className="close" href="" onClick={this.resetBuilder}>&#10008;</a>
            <div className="content">
              <h4>On refait une partie?</h4>
              <p>Nom: {this.state.riddle}<br/>
                  Alias : {this.state.aliases[0]}<br/>
                  Race : {this.state.race}<br/>
                  Produit : {this.state.publisher}<br/>
                  Super {this.state.biography === "good" ? "Héro" : "Vilain"}
              </p>
            </div>
          </div>
        </div>
        
      </div>
      );
    }
}
    
export default App;
    
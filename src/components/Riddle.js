//le masque de la devinette

// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
// (CSS assurera de l’espacement entre les lettres pour mieux
// visualiser le tout).
import React from "react";

//  "\w"  => [a-zA-Z0-9_] Caractère alpha-numérique, ou underscore; g, signifiant "global"
const reg = /\w/g;

export class Riddle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            letters: ["B", "O", "N"],
            usedLetters: ["O", "A", "B"],
            pendu:[]
        };
    }
  
componentDidUpdate() { 
    const newPendu =  this.state.usedLetters.map(letter => this.state.letters.includes(letter) ? letter : '_');
    this.setState({pendu: newPendu});
}

  render(){
    return (
      <div className="App">
          <button>test</button>
      </div>
    );
  };
}

export default Riddle; 


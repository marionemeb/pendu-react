import React from 'react';
import LetterBtn from './LetterBtn';

// class ListLetters extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           selected: false,
//         };
//         this.handleClick = this.handleClick.bind(this);
//         this.handleClassNameChange = this.handleClassNameChange.bind(this);
//         this.computeDisplay = this.computeDisplay.bind(this);
//     }
  
//     handleClick = (e) => {
//       this.setState({ 
//           usedLetters: this.state.usedLetters.concat(e)
//       })
//     }
  
    // handleClassNameChange(){
    //   this.setState({ selected: true})
    // }
  
    // componentDidMount(){
    //   setInterval(
    //     () => this.computeDisplay(),
    //     500
    //   );
    // }
  
    // computeDisplay() {  
    //   this.setState({ penduLetters: this.state.riddle.replace(/\w/g, (letter) => (this.state.usedLetters.includes(letter) ? letter : '_')  )})
    // }
    
//     render(){
         
//       return (
//         <div>
//         {this.props.letters.map(letter => {
//             <Letter 
//             letter={letter}
//             key={letter} 
//             onClick={this.handleClick}/>
//             })
//         }
//         </div>
//       );
//     }
// }
 

class ListLetters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          riddle: "BON",
          usedLetters: [],
          penduLetters: "",
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClassNameChange = this.handleClassNameChange.bind(this);
        this.computeDisplay = this.computeDisplay.bind(this);
      }

    handleClick = (e) => {
        this.setState({ 
            usedLetters: this.state.usedLetters.concat(e)
        })
        this.handleClassNameChange();
      }
    
      handleClassNameChange(){
        this.setState({ selected: true})
      }
render(){
    return (
        this.props.letters.map(letter => (
            <div>
            <LetterBtn 
            letter={letter}
            selected={this.state.selected}
            onClick={this.handleClick}
            />
            </div>
        ))
    )}
}    

export default ListLetters;
      
import React from "react";
import './Riddle.css';

function Riddle(props){
    return(
        <div className="pendu-riddle panel">
          {props.children}
          <div className="riddle">
            {props.penduLetters ? props.penduLetters : props.riddle.replace(/\w/g, '_')}
          </div>
          <img src={props.avatar} alt={props.penduLetters} className="avatar"/>
        </div>
    )
}

export default Riddle;
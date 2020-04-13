import React from "react";
import './Letter.css';

function LetterBtn({ letter, selected }) {
    return ( 
        <button 
        className={selected ? "selected" : ""} 
        key={letter}
        >
            {letter}
        </button>
    );
}

export default LetterBtn;
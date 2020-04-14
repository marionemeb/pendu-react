import React from "react";
import './LetterBtn.css';

class LetterBtn extends React.Component {
    handleClick = () => this.props.onClick(this.props.index)

    render() {
        return ( 
            <button 
            type="button"
            className={this.props.isSelected ? "selected col-2" : "btn col-2"} 
            onClick={this.handleClick}
            >
            { this.props.name }
            </button>
        );
    }
}

export default LetterBtn;
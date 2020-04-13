import React from "react";
import './LetterBtn.css';

class LetterBtn extends React.Component {
    handleClick = () => this.props.onClick(this.props.index)

    render() {
        return ( 
            <button 
            type="button"
            className={this.props.isSelected ? "selected" : ""} 
            onClick={this.handleClick}
            >
            { this.props.name }
            </button>
        );
    }
}

export default LetterBtn;
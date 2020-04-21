import React from "react";
import './Popup.css';

function Popup(props){
    return(
        <div className="content">
            {props.nbError < 10 ? <><h2>GAGNE !</h2><h4>On refait une partie?</h4></> : <><h2>PERDU !</h2><h4>Retentes ta chance...</h4></>}
            
            <p>Nom: {props.name}<br/>
                Alias : {props.alias}<br/>
                Race : {props.race}<br/>
                Univers : {props.univers}<br/>
                Super {props.super === "good" ? "Héro" : "Vilain"}
            </p>
        </div>
    )
}

export default Popup;
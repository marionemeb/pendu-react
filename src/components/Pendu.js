import React from "react";
import './Pendu.scss';

function Pendu(props){
    return(
        <div className="panel">
        <div className="pendu">
          <div className="table">
            <div id="img-1" className={props.errors < 1 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-2" className={props.errors < 2 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-3" className={props.errors < 3 ? "pendu-hidden" : "pendu-not-hidden"}></div>
          </div>
          <div className="table">
            <div id="img-4" className={props.errors < 4 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-5" className={props.errors < 5 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-6" className={props.errors < 6 ? "pendu-hidden" : "pendu-not-hidden"}></div>
          </div>
          <div className="table">
            <div id="img-7" className={props.errors < 7 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-8" className={props.errors < 8 ? "pendu-hidden" : "pendu-not-hidden"}></div>
            <div id="img-9" className={props.errors < 9 ? "pendu-hidden" : "pendu-not-hidden"}></div>
          </div>
        </div>
        <p className="text bottom-right">THE END</p>
        </div>
    )
}

export default Pendu;
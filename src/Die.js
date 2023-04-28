import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "tomato"
    }
    
      
    return (
        <div 
            className={`dice face face-${props.value}`}
            style={styles}
            onClick={props.holdDice}
            
        >
          {props.value === 1 && <span className="dot"></span>} 
          
          {props.value === 2 && 
           <>
           <span className="dot"></span>
           <span className="dot"></span>
           </>} 
           
           {props.value === 3 && 
           <>
           <span className="dot"></span>
           <span className="dot"></span>
           <span className="dot"></span>
           </>} 
           
           {props.value === 4 && 
           <>
           <div className="column">
           <span className="dot"></span>
           <span className="dot"></span>
           </div>
           <div className="column">
           <span className="dot"></span>
           <span className="dot"></span>
           </div>
           </>}
           
           {props.value === 5 && 
           <>
           <div className="column">
           <span className="dot"></span>
           <span className="dot"></span>
           </div>
           <div className = "column">
           <span className="dot"></span>
           </div>
           <div className="column">
           <span className="dot"></span>
           <span className="dot"></span>
           </div>
           </>}
           
           {props.value === 6 && 
           <>
           <div className="column">
           <span className="dot"></span>
           <span className="dot"></span>
           <span className="dot"></span>
           </div>
           <div className="column">
           <span className="dot"></span>
           <span className="dot"></span>
           <span className="dot"></span>
           </div>
           </>}
          
          
        </div>
        
        
    )
}
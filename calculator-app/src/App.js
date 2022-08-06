import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [result, setResult] = useState("");

  // Function to handle change
  const handleChange = (event) => {
    setResult(result.concat(event.target.name));
  }

  // Function to handle clear
  const handleClear = () => {
    setResult("");
  }

  // Function to handle backspace
  const handleBackspace = () => {
    setResult(result.slice(0, -1)); 
    // setResult(result.slice(0, result.length - 1));
  }

  // Function to handle equals
  const handleEquals = () => {
    try{
      setResult(eval(result).toString()); // eval() is a built-in function in JavaScript
    }catch(err){
      setResult("Error");
    }
  }

  return (
    <section className="calculator-container">
     {/* First raw*/}
      <div className="output">
        <div className="previous-operand">
          
        </div>
        <div className="current-operand">
          <form>
            <input type="text" value={result} />
          </form>
        </div>
      </div>
      {/* Second raw*/}
      <button className="span-two" onClick={handleClear} >Clear</button>
      <button onClick={handleBackspace} >DEL</button>
      <button name="/" onClick={handleChange}>÷</button>
  
      <button name="1" onClick={handleChange} >1</button>
      <button name="2" onClick={handleChange} >2</button>
      <button name="3" onClick={handleChange} >3</button>
      <button name="*" onClick={handleChange} >×</button>
      {/* Fourth raw*/}
      <button name="4" onClick={handleChange} >4</button>
      <button name="5" onClick={handleChange} >5</button>
      <button name="6" onClick={handleChange} >6</button>
      <button name="+" onClick={handleChange} >+</button>
      {/* Fifth raw*/}
      
      <button name="7" onClick={handleChange} >7</button>
      <button name="8" onClick={handleChange} >8</button>
      <button name="9" onClick={handleChange} >9</button>
      <button name="-" onClick={handleChange} >-</button>
      {/* Sixth raw*/}
      <button name="." onClick={handleChange} >.</button>
      <button name="0" onClick={handleChange} >0</button>
     <button className="span-two" onClick={handleEquals} >=</button>
    </section>
  );
};

export default App;

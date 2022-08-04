import React, { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate"
}

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit.toString(),
          overwrite: false
        }
      }
      if(state.currentOperand === "0" && payload.digit === "0") return state
      if(state.currentOperand.includes(".") === "0" && payload.digit === ".") return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousOperand == null && state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation

      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if(state.currentOperand === null) return state
      if(state.currentOperand.length === 1) return {
        ...state,
        currentOperand: null
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null
      }
    
  
    default:
      return state;
  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  const current = parseFloat(currentOperand);
  const previous = parseFloat(previousOperand);
  if(isNaN(previous) || isNaN(current)) return "";

  let computation = "";
  switch (operation) {
    case "÷":
      computation = previous / current;
      break;
    case "x":
      computation = previous * current;
      break;
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    default:
      return "";
  }
  return computation.toString();
}

// Function to create integer formatter

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
});

function formatOperand(operand) {
  if(operand == null) return "";

  const [integer, decimal] = operand.split(".");

  if(decimal == null) {
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
  }
}



const App = () => {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  //dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: 1}});

  return (
    <section className="calculator-container">
     {/* First raw*/}
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      {/* Second raw*/}
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>Ac</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      {/* Third raw*/}
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="×" dispatch={dispatch} />
      {/* Fourth raw*/}
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      {/* Fifth raw*/}
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      {/* Sixth raw*/}
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
     <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </section>
  );
};

export default App;

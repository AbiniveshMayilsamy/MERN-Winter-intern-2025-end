import "./App.css";
import { useState } from "react";
// import { Component1 } from "./Component1";
// import Component2, { Component, Component3 } from "./Component2";
// import Component4 from "./Component4";
// import Component5 from "./Component5";
// import NamedComponent, {
//   NamedComponent2,
//   NamedComponent3,
// } from "./NamedComponent";
// import GrandFather from "./GrandFather";

function App() {
  // let val = 0;
  let [val, setVal] = useState(10);
  const handleIncrement = () => {
    // val = val + 1;
    setVal(val + 1);
    console.log("Increment Button Clickeed", val);
  };
  const handleDecrement = () => {
    // val = val - 1;
    setVal(val - 1);
    console.log("Decrement Button Clickeed", val);
  };
  return (
    <div className="App">
      <h1>Learning React</h1>
      <div className="Counter">
        <h1>Counter</h1>
        <h1>{val}</h1>
        <div className="Button">
          <button className="inc" onClick={handleIncrement}>
            Increment
          </button>
          <button className="dec" onClick={handleDecrement}>
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

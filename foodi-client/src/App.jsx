import { useState } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import necessary components from react-router-dom
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg"; // Correct path for vite.svg
import "./App.css";
import Offer from "./Offer";
import KommunicateChat from "./chat";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>{" "}
      */}

      {/* Wrap your routes with the Router component */}
      
      

    </>
  );
}

export default App;

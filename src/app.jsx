import React from "react";
import ReactDOM from "react-dom/client";

import { add } from "./index";

const App = () => {
  const [numberInput, setNumberInput] = React.useState("");
  const [result, setResult] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    // Replace all occurrences of '\n' with actual newline characters
    const processedInput = numberInput.replace(/\\n/g, '\n');
 
    const result = add(processedInput);
    setResult(result);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
        />
        <button>Calculate</button>
      </form>
      <p>Result: {result}</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

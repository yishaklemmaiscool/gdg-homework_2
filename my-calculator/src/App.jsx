
import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // keep inputs as strings (start empty)
  const [count, setCount] = useState("");
  const [within, setWithin] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("+");
  const [live, setLive] = useState(true);
  const aRef = useRef(null);

  const parseNumber = (s) => {
    if (s === null || s === undefined || s === "") return NaN;
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  };

  const compute = (op) => {
    const a = parseNumber(count);
    const b = parseNumber(within);
    if (isNaN(a) || isNaN(b)) return setResult("Enter valid numbers");
    if (op === "+") return setResult(String(a + b));
    if (op === "-") return setResult(String(a - b));
    if (op === "*") return setResult(String(a * b));
    if (op === "/") {
      if (b === 0) return setResult("Cannot divide by zero");
      return setResult(String(a / b));
    }
  };

  const handleOperation = (op) => {
    setOperation(op);
    compute(op);
  };

  const clear = () => {
    setCount("");
    setWithin("");
    setResult("");
    setOperation("+");
    aRef.current?.focus();
  };

  // live compute when inputs or operation change
  useEffect(() => {
    if (live) {
      // only compute when both inputs have something (or you can change logic)
      compute(operation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, within, operation, live]);

  // keyboard shortcuts: Enter -> compute, Escape -> clear
  const onCardKeyDown = (e) => {
    if (e.key === "Enter") {
      // prevent form submission behavior
      e.preventDefault();
      compute(operation);
    }
    if (e.key === "Escape") {
      clear();
    }
  };

  return (
    <div className="calculator">
      <div className="card" tabIndex={0} onKeyDown={onCardKeyDown}>
        <header className="calc-header">
          <h1>My Calculator</h1>
        </header>

        <div className="inputs">
          <label className="input-group">
            <span>Value A</span>
            <input
              ref={aRef}
              className="calc-input"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              aria-label="Value A"
            />
          </label>

          <label className="input-group">
            <span>Value B</span>
            <input
              className="calc-input"
              type="number"
              value={within}
              onChange={(e) => setWithin(e.target.value)}
              aria-label="Value B"
            />
          </label>
        </div>

        <div className="controls">
          <div className="btn-row">
            <button
              className={`btn ${operation === "+" ? "active" : ""}`}
              onClick={() => handleOperation("+")}
              aria-pressed={operation === "+"}
            >
              +
            </button>
            <button
              className={`btn ${operation === "-" ? "active" : ""}`}
              onClick={() => handleOperation("-")}
              aria-pressed={operation === "-"}
            >
              −
            </button>
            <button
              className={`btn ${operation === "*" ? "active" : ""}`}
              onClick={() => handleOperation("*")}
              aria-pressed={operation === "*"}
            >
              ×
            </button>
            <button
              className={`btn ${operation === "/" ? "active" : ""}`}
              onClick={() => handleOperation("/")}
              aria-pressed={operation === "/"}
            >
              ÷
            </button>
          </div>

          <div className="right-controls">
            <label className="live-toggle">
              <input
                type="checkbox"
                checked={live}
                onChange={(e) => setLive(e.target.checked)}
              />
              Live
            </label>
            <button className="btn clear" onClick={clear} title="Clear (Esc)">
              Clear
            </button>
          </div>
        </div>

        <div className="result">Result: <strong>{result || "—"}</strong></div>
      </div>
    </div>
  );
}

export default App;
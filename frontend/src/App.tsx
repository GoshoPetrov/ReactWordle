import "./App.css";
import Wordle from "./Wordle";

// promise


function App() {
  return (
    <div>
      <button onClick={async () => {
        const response = await fetch("/api/word")
        const result = await response.text();
        console.log(result);
      }}>Call API</button>

      {/* <button onClick={() => {
        fetch("http://localhost:5100/word")
          .then((response) => response.text())
          .then((data) => console.log(data));
      }}>Call API</button> */}
      <Wordle />
    </div>
  );
}

export default App;

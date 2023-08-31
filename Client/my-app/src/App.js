import { useState } from "react";
import axios from "axios";
import chatGpt from "./chatGpt.png";
import msg from "./chat.png";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //communicate with API
    axios
      .post("https://chatgpt-bakend.onrender.com/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        console.log("data : " + res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.error("API Response Error:", error.response.data);
        } else if (error.request) {
          console.error("Request Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
        setLoading(false);
      });
  };

  return (
    <div className="wrapper">
      <img src={msg} alt="" className="app-logo" />
      <form onSubmit={handleSubmit}>
        <img
          src={chatGpt}
          alt=""
          className={loading ? "cg-logo loading" : "cg-logo"}
        />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything... :)"
        />
        <button type="submit">Ask</button>
      </form>
      <p className="response-area">{loading ? "loading..." : response}</p>
      <div className="footer">~Created by Christin Thomas~</div>
    </div>
  );
}

export default App;

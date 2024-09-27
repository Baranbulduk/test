import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header/header";

function AddMessages() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [createdAt, setCreatedAt] = useState(""); // Ny state för createdAt
  const [id, setId] = useState(null); // Ny state för ID

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    const message = params.get("message");
    const createdAt = params.get("createdAt"); // Läsa createdAt från URL
    const id = params.get("id"); // Läsa ID från URL

    if (username) setUsername(username);
    if (message) setMessage(message);
    if (createdAt) setCreatedAt(createdAt); // Sätta createdAt i state
    if (id) setId(id); // Sätta ID i state
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Uppdatera befintligt anslag
        const response = await axios.put(`https://3wdwn7v146.execute-api.eu-north-1.amazonaws.com/message/${id}`, {
          message,
        });
        console.log("PUT Response:", response.data);
      } else {
        // Skapa nytt anslag
        const response = await axios.post("https://3wdwn7v146.execute-api.eu-north-1.amazonaws.com/message", {
          username,
          message,
        });
        console.log("POST Response:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      // Omdirigera till fel-URL
      window.location.href = "http://localhost:5173/error";
    }
  };

  return (
    <>
      <div className="background">
        <div className="app">
          <Header />
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <p>Message:</p>
              <br />
              <textarea
                className="input textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <br />
            <label>
              <p>Username:</p>
              <br />
              <input
                type="text"
                className="input text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddMessages;

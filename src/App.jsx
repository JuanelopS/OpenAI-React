import { useState } from "react";
import { generateImage } from "./components/OpenAI";
import { SuperBalls } from "@uiball/loaders";
import "./App.css";

function App() {

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const form = document.querySelector(".App-input");

  const generateNewImage = (e) => {
    e.preventDefault();
    generateImage(prompt)
      .then((response) => {
          setIsLoading(true);
          setImage(response);
          setTimeout(() => {
              setIsLoading(false);
              setSubtitle(prompt);
              form.reset();
        }, 5000);
      })
      .catch((error) => console.log("Oops, something went wrong...", error));
  };

  return (
    <div className="App">
      <h1 className="App-title">React - OpenAI Api</h1>
      <div className="App-image">
        {isLoading ? (
          image == "" ? (
            <SuperBalls
              className="loader"
              size={45}
              speed={1.4}
              color="white"
            />
          ) : (
            <SuperBalls
              className="loader"
              size={120}
              speed={1}
              color="tomato"
            />
          )
        ) : (
          <div className="image-container">
            <h3 className="image-title">{subtitle}</h3>
            <img className="image" src={image} alt={prompt} loading="lazy" />
          </div>
        )}
      </div>
      <form className="App-input" onSubmit={generateNewImage}>
        <textarea
          className="App-textarea"
          maxLength="250"
          minLength="4"
          placeholder="Describe something..."
          cols="30"
          rows="3"
          onChange={(e) => setPrompt(e.target.value)}
          autoFocus
        ></textarea>
        <input type="submit" className="App-button" value="Generate Image" />
      </form>
      <footer className="footer">
        <p>
          <a href="https://github.com/JuanelopS/OpenAI-React">
            Developed by Juan Gavira {new Date().getFullYear()}
          </a>
          &nbsp; - &nbsp;
          <a href="https://openai.com/api/">OpenAI</a>
        </p>
      </footer>
    </div>
  );
}

export default App;

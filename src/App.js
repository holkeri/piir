/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.css';
import content from './content.json';
import { SwitchTransition, CSSTransition } from "react-transition-group";

const spliceRandomElement = array => array.splice(Math.floor(array.length * Math.random()), 1)[0];

function App() {
  const [language, setLanguage] = useState('fi');
  const [phrases, setPhrases] = useState([]);
  const [phrase, setPhrase] = useState();

  const changeLanguage = event => setLanguage(event.target.value)
  const getNewPhrase = () => {
    const newPhrases = phrases.length ? [...phrases] : [...content];
    const newPhrase = spliceRandomElement(newPhrases);
    setPhrase(newPhrase);
    setPhrases(newPhrases);
  };
  const clearPhrase = () => setPhrase(undefined);

  return (
    <div className="app">
      <div className="header">
        <select className="button" value={language} onChange={changeLanguage}>
          <option value="fi">🇫🇮</option>
          <option value="en">🇬🇧</option>
        </select>
      </div>
      <div className="main">
        <SwitchTransition>
          <CSSTransition
            key={phrase && phrase[language]}
            addEndListener={(node, done) => node.addEventListener("animationend", done, false)}
            classNames="bouncy"
          >
            <p className="phrase">{phrase && phrase[language]}</p>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <div className="footer">
        <CSSTransition
          in={phrase}
          addEndListener={(node, done) => node.addEventListener("animationend", done, false)}
          classNames="bouncy"
          unmountOnExit
        >
          <button className="button" onClick={clearPhrase}>❌</button>
        </CSSTransition>
        <button className="button" onClick={getNewPhrase}>✨</button>
      </div>
    </div>
  );
}

export default App;

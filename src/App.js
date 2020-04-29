/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.css';
import content from './content.json';
import { useTransition, animated } from 'react-spring'

// http://reactcommunity.org/react-transition-group/switch-transition

const spliceRandomElement = array => array.splice(Math.floor(array.length * Math.random()), 1);

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

  const transitions = useTransition(phrase && phrase.map(p => p[language]), null, {
    from: { position: 'absolute', opacity: 0, transform: 'scale3d(0, 0, 0)' },
    enter: { opacity: 1, transform: 'scale3d(1, 1, 1)' },
    leave: { opacity: 0, transform: 'scale3d(0, 0, 0)' },
    config: (item, state) => (state === 'leave' ? { friction: 40, tension: 360 } : { friction: 12, tension: 280 })
  });

  return (
    <div className="app">
      <div className="header">
        <select className="button" value={language} onChange={changeLanguage}>
          <option value="fi">🇫🇮</option>
          <option value="en">🇬🇧</option>
        </select>
      </div>
      <div className="main">
        {transitions.map(({ item, key, props }) => <animated.p style={props} key={key} className="phrase">{item}</animated.p>)}
      </div>
      <div className="footer">
        {phrase && <button className="button" onClick={clearPhrase}>❌</button>}
        <button className="button" onClick={getNewPhrase}>✨</button>
      </div>
    </div>
  );
}

export default App;

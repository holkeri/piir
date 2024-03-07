import React, { useRef, useState } from 'react';
import './App.css';
import content from './content.json';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

type Language = 'en' | 'fi'
type TextByLanguage = Record<Language, string>

const getShuffledPhrases = (): TextByLanguage[] => {
  const phrases = [...content]
  for (let i = phrases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [phrases[i], phrases[j]] = [phrases[j], phrases[i]];
  }
  return phrases
}
const texts: Record<string, TextByLanguage> = {
  language: {en: '🇬🇧', fi: '🇫🇮'},
  new: {en: 'New', fi: 'Uusi'},
  hide: {en: 'Hide', fi: 'Piilota'},
}

const App = () => {
  const [language, setLanguage] = useState<Language>('en')
  const [phrases, setPhrases] = useState<TextByLanguage[]>(getShuffledPhrases)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(false)
  const translatedPhrase = phrases[phraseIndex][language]
  const nextPhrase = () => {
    if (phraseIndex < phrases.length - 1) {
      setPhraseIndex(phraseIndex + 1)
    } else {
      setPhrases(getShuffledPhrases())
      setPhraseIndex(0)
    }
    setPhraseVisible(true)
  }
  const hidePhrase = () => setPhraseVisible(false)
  const toggleLanguage = () => language === 'en' ? setLanguage('fi') : setLanguage('en')
  const nodeRef = useRef(null)

  return (
    <div className="app">
      <div className="header">
        <button onClick={toggleLanguage} className="ghost">{texts.language[language]}</button>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={phraseVisible.toString() + language}
          classNames="fade"
          timeout={200}
          nodeRef={nodeRef}
        >
          <div className="main" ref={nodeRef}>
          {phraseVisible ?
            <>
              <p className="phrase">{translatedPhrase}</p>
              <button onClick={hidePhrase}>❌ {texts.hide[language]}</button>
            </>
            :
            <button onClick={nextPhrase}>✨ {texts.new[language]}</button>
          }
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default App

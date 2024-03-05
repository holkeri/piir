import React, { useState } from 'react';
import './App.css';
import content from './content.json';

type Language = 'en' | 'fi'
type Phrase = Record<Language, string>

const getShuffledPhrases = (): Phrase[] => {
  const phrases = [...content]
  for (let i = phrases.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [phrases[i], phrases[j]] = [phrases[j], phrases[i]];
  }
  return phrases
}
const texts: Record<string, Phrase> = {
  language: {en: '🇬🇧', fi: '🇫🇮'},
  new: {en: 'New', fi: 'Uusi'},
  hide: {en: 'Hide', fi: 'Piilota'},
}

const App = () => {
  const [language, setLanguage] = useState<Language>('en')
  const [phrases, setPhrases] = useState<Phrase[]>(getShuffledPhrases)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(false)
  const phraseTranslation = phrases[phraseIndex][language]
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

  return (
    <div className="app">
      <div className="header">
        <button onClick={toggleLanguage} className="ghostIcon">{texts.language[language]}</button>
      </div>
      <div className="main">
      {phraseVisible ?
        <>
          <p className="phrase">{phraseTranslation}</p>
          <button onClick={hidePhrase}>❌ {texts.hide[language]}</button>
        </>
        :
        <button onClick={nextPhrase}>✨ {texts.new[language]}</button>
      }
      </div>
    </div>
  )
}

export default App

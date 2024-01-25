// Hello.js
import React, { useState, useEffect } from 'react';
import './greet.css';
import avatar from '../pictures/avatar.gif';
import audioData from './randomResponse.json'; // Update the path accordingly

const Hello = () => {
  const [audioItems, setAudioItems] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    setAudioItems(audioData.audioItems);
  }, []);

  const playRandomAudio = () => {
    if (audioItems.length === 0) {
      console.error('No audio items found in the JSON file');
      return;
    }

    // If there's a current audio, stop it
    if (currentAudio) {
      stopCurrentAudio();
      return;
    }

    // Get a random index
    const randomIndex = Math.floor(Math.random() * audioItems.length);

    // Play the audio for the selected index
    playAudioAtIndex(randomIndex);
  };

  const playAudioAtIndex = (index) => {
    const { audioLink, displayText } = audioItems[index];

    // Set the text in the h3 element
    document.getElementById('hello-text').innerText = displayText;

    // Create an audio element and play the audio
    const audio = new Audio(audioLink);
    setCurrentAudio(audio); // Save the current audio for stopping later
    audio.play();

    // Listen for the end of the audio and reset the current audio
    audio.addEventListener('ended', () => {
      setCurrentAudio(null); // Reset current audio
      resetText();
    });
  };

  const stopCurrentAudio = () => {
    // If there's a current audio, stop it
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null); // Reset current audio
      resetText();
    }
  };

  const resetText = () => {
    // Reset the text to the default
    document.getElementById('hello-text').innerText =
      "Hi, I'm ISKA, a PUP Lopez Virtual Assistant. How can I assist you today?";
  };

  return (
    <div>
      <div className='avatar-container'>
        <h3 id='hello-text' className='hello'>
          Hi, I'm ISKA, a PUP Lopez Virtual Assistant. How can I assist you today?
        </h3>
        <img className='avatar' src={avatar} alt='avatar' onClick={playRandomAudio} />
      </div>
    </div>
  );
};

export default Hello;

import React, { useState } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './App.css';

import iska from './pictures/iska-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion, faKeyboard, faPaperPlane, faTimes, faVideo } from '@fortawesome/free-solid-svg-icons';

// Get and call the Menu.js 
import Menu from './Menu/Menu';

// Get the response to a command
import Responses from './fileJSON/dataResponse.json';

// calling the button when commanding 
import YearButtons from './displayButton/displayEnroll';
import Program from './displayButton/displayProgram';
import About from './displayButton/displayAbout';

// Install a font for ISKA name
import "@fontsource/krona-one"; 

//GREETINGS AND CAN DO OF ISKA
import Avatar from './greetingResponse/hello';
import IskaDo from './greetingResponse/iskaDo';

//QUERIES OR QUESTIONS about PUP
import Eregular from './showRespose/Enroll/regular';
import Eirregular from './showRespose/Enroll/irregular';
import Efreshmen from './showRespose/Enroll/freshmen';
import Etransferee from './showRespose/Enroll/transferee';

import Graduation from './showRespose/graduationReq';
import Bachelor from './showRespose/Programs/bachelor';
import Diploma from './showRespose/Programs/diploma';

import History from './showRespose/About/history';
import Mission from './showRespose/About/mission';
import Vision from './showRespose/About/vision';
import Hymn from './showRespose/About/hymn';

import Achiever from './showRespose/Achiever/PLDL';
import Goodmoral from './showRespose/goodMoral/goodmoral';

//BUILDINGS 
import Canteen from './buildings/canteen';
import Science from './buildings/science';
import Engineer from './buildings/engineer';
import Yumul from './buildings/yumul';
import Admission from './buildings/admission';
import Lab1 from './buildings/lab1';
import Lab2 from './buildings/lab2';
import Grandstand from './buildings/grandstand';
import Gymnasium from './buildings/gymnasium';
import Nantes from './buildings/nantes';
import Education from './buildings/education';
import Hospitality from './buildings/hospitality';
import ComfortRoom from './buildings/comfortroom';

import Vr from './VRtour';

import suggestionsData from './fileJSON/Specific.json';

// Function for the searchInput 
function TextInputApp({ onSendText, microphoneHidden, toggleMicrophone, setMicrophoneHidden, onSuggestionClick}) {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState(['']);

  // Handle of showing the searchInput
  const handleShowInput = () => {
    setShowInput(true);
    setMicrophoneHidden(true); // Hide the microphone button when input is shown
  };

  // Handle the close button 
  const handleCloseButtonClick = () => {
    setShowInput(false);
    setMicrophoneHidden(false); // Show the microphone button

    const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

  };

  // handle the input change in searchInput
  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setInputText(userInput);

    const showList = document.querySelectorAll('.list-result');
    showList.forEach((element) => {
            element.style.display = '';
          });

  // Filter suggestions based on the user input
  const filteredSuggestions = suggestionsData.filter(
    suggestion => suggestion.text.toLowerCase().includes(inputText.toLowerCase())
  );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion.text);
    setSuggestions([]); // Clear suggestions after selecting one
    onSuggestionClick(suggestion);
  };

  // Handle the text when sending trigger
  const handleSendText = () => {
    onSendText(inputText);
    setInputText('');
    window.scrollTo(0, 0);
  };


  // Returning and displaying the searchInput 
  return (
    <div className='input'>
      {!showInput && ( // Conditionally render the faKeyboard icon when showInput is false
        <FontAwesomeIcon
          className="keyBoard"
          onClick={handleShowInput} // Showing searchInput
          icon={faKeyboard}
          size="xl"
          style={{ color: '#ffc800' }}
        />
      )}
      <div>
        {showInput && (
        <div className="center-input">
          <div className='closed-back'>
            <FontAwesomeIcon
              onClick={handleCloseButtonClick} // Close button or back to show microphone
              icon={faMicrophone}
              size="2xl"
              style={{ color: '#ffc800' }}
            />
          </div>
          <div className='list-result'>
          {inputText && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.text}
                </li>
              ))}
            </ul>
          )}
        </div>

          <input
            type="text"
            placeholder="Type a keyword..."
            value={inputText}
            onChange={handleInputChange} // input when change and typing in searchInput
          />
          <div className="center-icon">
            <div className='send'>
              <FontAwesomeIcon
                onClick={handleSendText} // Sending the input of user
                icon={faPaperPlane}
                size="2xl"
                style={{ color: '#ffc800' }}
              />
            </div>
          </div>
          
        </div>

      )}
      </div>
      
      {microphoneHidden && !showInput && ( // hide the microphone and show the searchInput
        <FontAwesomeIcon
          onClick={() => toggleMicrophone(false)}
          icon={faMicrophone}
          size="sm"
          style={{
            "--fa-primary-color": "#ffffff",
            "--fa-secondary-color": "#ffffff",
          }}
        />
      )}
    </div>
  );
}

export default function DOM() {
 // State for controlling speech activation
const [speechActive, setSpeechActive] = useState(false);
// State for displaying text on the screen
const [displayTextOnScreen, setDisplayTextOnScreen] = useState('');
// State for controlling the visibility of the reset button
const [resetButtonVisible, setResetButtonVisible] = useState(false);
// State to control the visibility of the question list
const [showQuestions, setShowQuestions] = useState(false);

const [showVirtual, setVirtual] = useState(false);

// State for controlling the visibility of the year button
const [yearbutton, setYearButtonVisible] = useState(false);
// State for holding the selected year response
const [selectedYearResponse, setSelectedYearResponse] = useState('');
// State for displaying other text
const [otherText, displayOtherText] = useState('');
// State for controlling the visibility of programs button
const [programsButton, setProgramsButton] = useState(false);
// State for holding the selected program response
const [programsResponse, setSelectedProgram] = useState('');
// State for controlling the visibility of about buttons
const [aboutButtons, setAboutVisible]= useState(false);
// State for holding the about response
const [aboutResponse, setAboutResponse] = useState('');
// State for tracking if a response is displayed
const [responseDisplayed, setResponseDisplayed] = useState(false);
// State for controlling the visibility of the microphone
const [microphoneHidden, setMicrophoneHidden] = useState(false);
// State for tracking if a command is recognized
const [commandRecognized, setCommandRecognized] = useState(false);
const [recognizedProcessText, setRecognizedProcessText] = useState(' ');
const [isQuestionIcon, setIsQuestionIcon] = useState(true);

//DIRECT RESPONSE
const [showEregular, setShowEregular] = useState(false);
const [showEirregular, setShowEirregular] = useState(false);
const [showEFreshmen, setShowEfreshmen] = useState(false);
const [showEtransferee, seteShowEtransferee] = useState(false);
const [showGrad, setShowGrad] = useState(false);
const [showBachelor, setShowBachelor] = useState(false);
const [showDiploma, setShowDiploma] = useState(false);
const [showHistory, setShowHistory] = useState(false);
const [showMission, setShowMission] = useState(false);
const [showVision, setShowVision] = useState(false);
const [showHymn, setShowHymn] = useState(false);
const[showAchiever, setShowAchiever] = useState(false);
const [showAvatar, setShowAvatar] = useState(false);
const [showGoodMoral, setShowGoodmoral] = useState(false);
const [showIskaDo, setShowIska] = useState(false);

//CANTEEN
const [canteenButton, setCanteenVisible] = useState(false);
const [canteenResponse, setCanteenResponse] = useState('');
//SCIENCE
const [scienceButton, setScienceVisible] = useState(false);
const [scienceResponse, setScienceResponse] = useState('');
//ENGINEER
const [engineerButton, setEngineerVisible] = useState(false);
const [engineerResponse, setEngineerResponse] = useState('');
//EDUCATION
const [educButton, setEducVisible] = useState(false);
const [educResponse, setEducResponse] = useState('');
//ADMISSION
const [admissionButton, setAdmissionVisible] = useState(false);
const [admissionResponse, setAdmissionResponse] = useState('');
//GRANDSTAND
const [grandstandButton, setGrandStandVisible] = useState(false);
const [grandstandResponse, setGrandStandResponse] = useState('');
//GYMNASIUM
const [gymButton, setGymVisible] = useState(false);
const [gymResponse, setGymResponse] = useState('');
//LAB1
const [lab1Button, setLab1Visible] = useState(false);
const [lab1Response, setLab1Response] = useState('');
//LAB2
const [lab2Button, setLab2Visible] = useState(false);
const [lab2Response, setLab2Response] = useState('');
//NANTES
const [nantesButton, setNantesVisible] = useState(false);
const [nantesResponse, setNantesResponse] = useState('');
//YUMUL
const [yumulButton, setYumulVisible] = useState(false);
const [yumulResponse, setYumulResponse] = useState('');
//HOSPITALITY 
const [hMButton, setHMVisible] = useState(false);
const [HMResponse, setHMResponse] = useState('');
//COMFORT ROOM
const[showCrVisible, setShowCrVisible] = useState(false);
const [showCrResponse, setShowCrResponse] = useState(false);

  const handleSuggestionClick = (suggestion) => {
    // Handle the suggestion click logic in the parent component
    console.log(`Suggestion clicked in parent: ${suggestion}`);
    // Add your logic here
  };

  const handleTextInput = (text) => {
    sendTextToCommands(text);

    // Show elements with the textOther classname
    const showTextOther = document.querySelectorAll('.textOther');
    showTextOther.forEach((element) => {
      element.style.display = ''; // Set to an empty string to use the default display value
    });
    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });
  };

// Function to handle a year button click event
const handleYearButtonClick = (year) => {
  const response = Responses[year];  // Retrieve the response associated with the selected year

    setSelectedYearResponse(response);

  };

  // Function to handle a program button click event
  const handleProgramButtonClick = (programs) => {
    const program = Responses[programs];  // Retrieve the response associated with the selected year

    setSelectedProgram(program);

  };

  // Function to handle a about button click event
  const handleAboutButtonClick = (about) => {
    const abouts = Responses[about];
    setAboutResponse(abouts);

  };

  const handleCanteenButtonClick = (canteen) => {
    const canteenn = Responses[canteen];

    setCanteenResponse(canteenn);
  }

  const handleScienceButtonClick = (science) => {
    const sciencee = Responses[science];

    setScienceResponse(sciencee);
  }

  const handleEngineerButtonClick = (engineer) => {
    const engineerr = Responses[engineer];

    setEngineerResponse(engineerr);
  }

  const handleEducButtonClick = (educ) => {
    const educc = Responses[educ];

    setEducResponse(educc);
  }
  const handleAdmissionButtonClick = (admission) => {
    const admissionn = Responses[admission];

    setAdmissionResponse(admissionn);
  }
  const handleGrandstandButtonClick = (grandstand) => {
    const grandstandd = Responses[grandstand];

    setGrandStandResponse(grandstandd);
  }
  const handleGymButtonClick = (gym) => {
    const gymm = Responses[gym];

    setGymResponse(gymm);
  }
  const handlelab1ButtonClick = (lab1) => {
    const lab1b = Responses[lab1];

    setLab1Response(lab1b);
  }
  const handleLab2ButtonClick = (lab2) => {
    const lab2b = Responses[lab2];

    setLab2Response(lab2b);
  }

  const handleHMButtonClick = (hm) => {
    const hMm = Responses[hm];

    setHMResponse(hMm);
  }

  const handleNantesButtonClick = (nantes) => {
    const nantesh = Responses[nantes];

    setNantesResponse(nantesh);
  }
  const handleYumulButtonClick = (yumul) => {
    const yumull = Responses[yumul];

    setYumulResponse(yumull);
  }
  const handleCrButtonClick = (cr) => {
    const crr = Responses[cr];

    setShowCrResponse(crr);
  }


// Function to display the text and speak it
const displayText = (text) => {
  let message = new SpeechSynthesisUtterance(text);

  // Get the list of available voices
  let voices = window.speechSynthesis.getVoices();

  // Find the English US female voice
  let englishVoice = voices.find(voice => voice.lang === 'en-US' && voice.gender === 'female');

  // Set the voice for the message
  message.voice = englishVoice;

  // Speak the message
  window.speechSynthesis.speak(message);
};

const handleEnrollButtonClick = () => {
  setYearButtonVisible(true);
  setResetButtonVisible(true);
  setCommandRecognized(true);
  setResponseDisplayed(true);
  displayText('Please choose from the options below to indicate the enrollment category you prefer')
  const textDisplay = `
          Please choose from the options below to indicate the enrollment category you prefer.
          `;
          displayOtherText(textDisplay);
    
const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
};

const handleAboutPUPButtonClick = () => {
  setAboutVisible(true);
  setResetButtonVisible(true);
  setCommandRecognized(true);
  setResponseDisplayed(true);
  displayText('Here are some information about P U P Lopez. Please select below which one do you want to see.');
        const textDisplay = `
        Here are some information about P U P Lopez. Please select below which one do you want to see.
        `;
        displayOtherText(textDisplay);

  const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
}

const handleAdminButtonClick = () => {
  setAdmissionVisible (true);
  setResetButtonVisible(true);
  setCommandRecognized(true);
  setResponseDisplayed(true);
  displayText('Please select your nearest area in campus, so that I can assist you to show the way to Admission Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Admission Building`;
        displayOtherText(textDisplay);
  const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
}

const handleGrandButtonClick = () => {
  setGrandStandVisible(true);
  setResetButtonVisible(true);
  setCommandRecognized(true);
  setResponseDisplayed(true);
  displayText('Please select your nearest area in campus, so that I can assist you to show the way to Grandstand');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Grandstand`;
        displayOtherText(textDisplay);
  const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
}

  // Function for reset button event
  const resetDisplay = () => {
    setDisplayTextOnScreen('');
    setResetButtonVisible(false); // Hide the reset button
    setYearButtonVisible(false);
    setSelectedYearResponse(false);
    displayOtherText(false);
    setSelectedProgram(false);
    setProgramsButton(false);
    setAboutResponse(false);
    setAboutVisible(false);
    setResponseDisplayed(false);
    setRecognizedProcessText(false);

    setCanteenResponse(false);
    setCanteenVisible(false);

    setScienceVisible(false);
    setScienceResponse(false);

    setEngineerVisible(false);
    setEngineerResponse(false);

    setAdmissionVisible(false);
    setAdmissionResponse(false);

    setYumulVisible(false);
    setYumulResponse(false);

    setLab1Visible(false);
    setLab1Response(false);

    setLab2Visible(false);
    setLab2Response(false);

    setGymVisible(false);
    setGymResponse(false);

    setGrandStandVisible(false);
    setGrandStandResponse(false);

    setNantesVisible(false);
    setNantesResponse(false);

    setEducVisible(false);
    setEducResponse(false);

    setHMVisible(false);
    setHMResponse(false);



    setShowEregular(false);
    setShowEfreshmen(false);
    setShowEirregular(false);
    seteShowEtransferee(false);
    setShowGrad(false);
    setShowBachelor(false);
    setShowDiploma(false);
    setShowHistory(false);
    setShowMission(false);
    setShowVision(false);
    setShowHymn(false);
    setShowAchiever(false);
    setShowIska(false);
    setShowGoodmoral(false);

    setShowAvatar(true);

    setShowCrVisible(false);
    setShowCrResponse(false);

    const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }

    const showAvatar = document.querySelectorAll('.avatar-container');
    showAvatar.forEach((element) => {
      element.style.display = '';

      const showSuggestions = document.querySelectorAll('.suggestions');
      showSuggestions.forEach((element) => {
        element.style.display = '';
      });


    });
  };

    // Function for toggleQuestions button event
  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
    setIsQuestionIcon(!isQuestionIcon);
  };

  const toggleVirtualtour = () => {
    setVirtual(!showVirtual);
  
  }
  
  // All the command user can ask for ISKA 
  const commands = [
    {
      command: ['hi', 'hello', 'hey', '* hello *', '* hello', 'hello *'],
      callback:() => {
        resetTranscript();
        displayText("Hello, I'm iska, how can I assist you?");
        const textDisplay = `Hello, I'm ISKA, how can I assist you?`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);
        setProgramsButton(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true);
        
        setResponseDisplayed(true);
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);        

        setShowAvatar(true);

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
          const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
      }

    },

    {
      command: ['* map *', 'map *', '* map', 'map', 'university map', 'map of the university', 'show university map'],
      callback: () => {
        resetTranscript();
        displayText('These is the map of P U P lopez quezon branch')
        setResetButtonVisible(true);
        setProgramsButton(false);


        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true);
        
        setResponseDisplayed(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });

      },
    },
    {
      command: ['* enroll *', '* enroll', 'enroll *', 'enroll', 'enrollment', '* enrollment', 'enrollment *', '* enrollment *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setYearButtonVisible(true);
          displayText('Please choose from the options below to indicate the enrollment category you prefer')
          const textDisplay = `
          Please choose from the options below to indicate the enrollment category you prefer.
          `;
          displayOtherText(textDisplay);

        setResetButtonVisible(true);

        
        setDisplayTextOnScreen(false);

        setProgramsButton(false);
        setSelectedProgram(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
         //COMFORT ROOM
         setShowCrVisible(false);
         setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
        
      },
    },

    {
      command: ['* do *', '* do', 'do *', 'do'],
      callback: () => {
        resetTranscript();
        displayText('There are various things that i can do. Below are the detailed list.');
        const textDisplay = `
        There are various things that i can do. Below are the detailed list.
        `;
        displayOtherText(textDisplay);

        setResetButtonVisible(true);
        setProgramsButton(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
         //COMFORT ROOM
         setShowCrVisible(false);
         setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(true);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
    const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });

      },
    },
    {
      command: ['About pup', '* about *', '* about', 'about *', '* about pup *', 'about pup *', '* about pup', 'about'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Here are some information about P U P Lopez. Please select below which one do you want to see.');
        const textDisplay = `
        Here are some information about P U P Lopez. Please select below which one do you want to see.
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed
        setAboutVisible(true);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setProgramsButton(false);
        setSelectedProgram(false);

        setAboutResponse(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
    const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });

        
      },
    },
      
    {
      command: ['* programs', 'programs *', '* program', 'program *', 'program', 'programs', 'course *', '* course ', '* course *', 'course', 'courses', 'courses *', '* courses', '* programs *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setProgramsButton(true);
        displayText('The P U P Lopez offers a lots of programs. Please select below which category do you want to see.');
        const textDisplay = `
        The P U P Lopez offers a lots of programs. Please select below which category do you want to see.
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
         //COMFORT ROOM
         setShowCrVisible(false);
         setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false)
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
        
        const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
    const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
          const hideAvatar = document.querySelectorAll('.avatar-container');
          hideAvatar.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },

    {
      command: ['* canteen', '* canteen *', 'canteen', 'canteen *'],
      callback:() => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Canteen');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Canteen
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        //CANTEEN
        setCanteenVisible(true);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
        
      }
    },

    {
      command: ['* science ', 'science *', '* science *', 'science', 'two o three',203,204,205,206,108,107,106,105,'* 203', '203 *', '204 *', '* 204', '*  205', ' 205 *', '206 *', '* 206', 'chemical lab', '* chemical lab', 'physical lab', '* physical lab', '105 *', '* 105', '106 *', '* 106', '107 *', '* 107', '108 *', '* 108'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Health and Science Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Health and Science Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(true);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: [109,110,111,112,113,114,115,116,211,210,209,208,207,'* engineer', 'engineer *', '* engineer *', 'engineer', '* engineering', 'engineering *', '* engineering *', 'engineering', 'architecture', '* architecture', 'architecture *', '* architecture *', 207, 208 ,209, 210, 211,109,110,111,112,113,114,114,116, 'ict lab 3', '* ict lab 3', '* ict lab * 3', 'draft lab', '* draft lab * 3', '* draft lab 3 *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Engineering and Architecture Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Engineering and Architect Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(true);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['* yumul', 'yumul *', '* yumul *', 'yumul',200,201,202,],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Yumul Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Yumul Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(true);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      } 
    },
    {
      command: [216,217,218,120,121,122,'* nantes', 'nantes *', '* nantes *', 'nantes', '* dental', 'dental *', 'business', '* business ', '* business *', '* business *' ,'* accounting *', '* 120', 'accounting', 'accounting *', '* accounting', '* accounting *', 'marketing', 'marketing *', '* marketing ', '* marketing*', ' *121', '121 *', '* 122','122 *', 'medical faculty', 'medical *', '* medical', '* medical *', 'avr', '* avr', 'avr *', '* avr *', 'library', '* library', 'library *', 'speech lab', '* speech lab', '* 216', '216 *', '217 *', ' * 217', '* 218', '218 *', '* 216', '216 *', '* 217', '217 *', ' * 122', '122 *', '* 121', '121 *', '120 *', ' * 120'],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Accounting and Marketing Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Accounting and Marketing Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(true);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['gymnasium', '* gymnasium', '* gymnasium *', 'gymnasium *', 'gym', '* gym', '* gym *', '* gym *', '*gym*'],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Gymnasium');
        const textDisplay= `
        Please select your nearest area in campus, so that I can assist you to show the way to Gymnasium`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(true);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['grandstand', '* grandstand', '* grandstand *', 'grandstand *', 'property office', '* property office', '* property *', '* property', '* rotc', 'rotc *', '* rotc *'],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Grandstand');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Grandstand`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(true);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: [212,213,214,215,117,118,119,'education', '* education', 'education *', '* education *', 'educ', '* educ', 'educ *', '* educ *', 'public *', '* public', '* public *', '117 *','* 117', '118 *', '* 118', '119 *','* 119', '212 *','* 212', '213 *','* 213', '214 *','* 214', '215 *','* 215', 'csc ', '* csc ', '* csc *'],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Education and Public Administration Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Education and Public Administration Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(true);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);

        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['admission', '* admission', 'admission *', '* admission *', 'osas', '* osas', 'osas *', '* osas *', 'cashier', '* cashier', '* cashier *', '* cashier *', 'registrar', '* registrar', ' registrar *', '* registrar *', 'academic ', '* academic', 'academic *', '* academic *', 'director office', '* director office', 'director * office ' ],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Admission Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Admission Building`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(true);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowGoodmoral(false);    
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
        }
    },
    {
      command: [103,'lab 1', 'lab * 1', 'laboratory 1', 'laboratory 1 *', '* laboratory 1 *', 'com lab 1', '*com * lab * 1', '* computer laboratory 1 *', 'computer lab 1',
       '* computer * lab * 1 *', '* computer laboratory 1 *', 'ICT lab 1', 'ICT laboratory 1', '* ICT lab 1 *', 'IT lab 1', 'IT laboratory 1', '* IT lab * 1 *',
       '* IT laboratory 1 *' ],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Computer Laboratory 1');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Computer Laboratory 1`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(true);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);

        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
     command: [104,'lab 2', 'lab * 2', 'laboratory 2', 'laboratory 2 *', '* laboratory 2 *', 'com lab 2', '*com * lab * 2', '* computer laboratory 2 *', 'computer lab 2',
      '* computer * lab * 2 *', '* computer laboratory 2 *', 'ICT lab 2', 'ICT laboratory 2', '* ICT lab 2 *', 'IT lab 2', 'IT laboratory 2', '* IT lab * 2 *',
      '* IT laboratory 2 *' ],
        callback: () => {
          resetTranscript();
          displayText('Please select your nearest area in campus, so that I can assist you to show the way to Computer Laboratory 2');
          const textDisplay = `
          Please select your nearest area in campus, so that I can assist you to show the way to Computer Laboratory 2`;
          displayOtherText(textDisplay);
          setResetButtonVisible(true); // Show the reset button after a command is executed
  
          setProgramsButton(false);
  
          setYearButtonVisible(false);
          setSelectedYearResponse(false);
  
          setDisplayTextOnScreen(false);
  
          setAboutVisible(false);
          setAboutResponse(false);
  
          setSelectedProgram(false);
  
          setResponseDisplayed(true); // Set responseDisplayed to true
          setCommandRecognized(true);
          //CANTEEN
          setCanteenVisible(false);
          setCanteenResponse(false);
          //SCIENCE
          setScienceVisible(false);
          setScienceResponse(false);
          //ENGINEER
          setEngineerVisible(false);
          setEngineerResponse(false);
          //YUMUL
          setYumulVisible(false);
          setYumulResponse(false);
          //NANTES
          setNantesVisible(false);
          setNantesResponse(false);
          //GYMNASIUM
          setGymVisible(false);
          setGymResponse(false);
          //GRANDSTAND
          setGrandStandVisible(false);
          setGrandStandResponse(false);
          //EDUCATION
          setEducVisible(true);
          setEducResponse(false);
          //ADMISSION
          setAdmissionVisible(false);
          setAdmissionResponse(false);
          //LAB1
          setLab1Visible(false);
          setLab1Response(false);
          //LAB2
          setLab2Visible(true);
          setLab2Response(false);
          //HOSPITALITY
          setHMVisible(false);
          setHMResponse(false);
          //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
       }
    },
    {
      command: [100,101,102,'hospitality', '* hospitality', 'hospitality ', ' hospitality ', 'hm', 'kitchen lab', ' kitchen lab','kitchen lab ', " kitchen lab ", ' kitchen ','beverage','*beverage','tissue', 'tissue', 'tissue lab', '* tissue lab ', 'plant',' plant ', 'plant',' plant lab *'],
      callback: () => {
        resetTranscript();
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Hospitality Management Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Hospitality Management Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(true);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(true);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
      
    },
    {
      command: ['regular', '* regular', 'regular *', '* regular *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the process on how to enroll regular student')
        const textDisplay = `Here is the process on how to enroll as a regular student`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(true);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
        
        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['irregular', '* irregular', 'irregular * ', '* irregular *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the process on how to enroll irregular student')
        const textDisplay = `Here is the process on how to enroll irregular student`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(true);
        seteShowEtransferee(false);
        setShowEfreshmen(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['freshmen', 'freshman'],
      callback: () => {
        resetTranscript();
        displayText('Here is the process on how to enroll freshmen student')
        const textDisplay = `Here is the process on how to enroll freshman student`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(true);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['transferee', '* transferee', 'transferee * ', '* transferee *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the process on how to enroll transferee student')
        const textDisplay = `Here is the process on how to enroll transferee student`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(true);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
        hideList.forEach((element) => {
                element.style.display = 'none';
              });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['graduation', '* graduation', 'graduation * ', '* graduation *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the requirements for graduation');
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(true);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['bachelor', '* bachelor', 'bachelor *', '* bachelor *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the bachelor od Science courses offer at P U P Lopez');
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(true);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['diploma', '* diploma', 'diploma *', '* diploma *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the Diploma courses offer at P U P Lopez');

        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(true);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['history', '* history', 'history *', '* history *'],
      callback: () => {
        resetTranscript();
        displayText('This is the history of the P U P');
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(true)
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['mission', '* mission', 'mission *', '* mission *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the Mission of P U P');
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(true);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['vision', '* vision ', 'vision *', '* vision *'],
      callback: () => {
        resetTranscript();
        displayText('Here is the P U P Vision');
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(true);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['hymn', '* hymn ', 'hymn *', '* hymn *', 'imno', '* imno', 'imno *', '* imno *'],
      callback: () => {
        resetTranscript();
        const textDisplay = 'Here is the PUP Hymn';
        displayOtherText(textDisplay);
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);


        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(true);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });

        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['lister', '* lister ', 'lister *', '* lister *', '* PL *'],
      callback: () => {
        resetTranscript();
        const textDisplay = `Here is the Requirements on how to become an Academic Achiever`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(true);
        setShowIska(false);
        setShowGoodmoral(false);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['moral', '* moral', 'moral * ', 'good moral', '* good moral', 'good moral *', '* good moral *'],
      callback: () => {
        resetTranscript();
        const textDisplay = `Here is the Requirements on how to get Good Moral`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        setCommandRecognized(true);
        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(false);
        setEngineerResponse(false);
        //YUMUL
        setYumulVisible(false);
        setYumulResponse(false);
        //NANTES
        setNantesVisible(false);
        setNantesResponse(false);
        //GYMNASIUM
        setGymVisible(false);
        setGymResponse(false);
        //GRANDSTAND
        setGrandStandVisible(false);
        setGrandStandResponse(false);
        //EDUCATION
        setEducVisible(false);
        setEducResponse(false);
        //ADMISSION
        setAdmissionVisible(false);
        setAdmissionResponse(false);
        //LAB1
        setLab1Visible(false);
        setLab1Response(false);
        //LAB2
        setLab2Visible(false);
        setLab2Response(false);
        //HOSPITALITY
        setHMVisible(false);
        setHMResponse(false);
        //COMFORT ROOM
        setShowCrVisible(false);
        setShowCrResponse(false);

        setShowEregular(false);
        setShowEirregular(false);
        setShowEfreshmen(false);
        seteShowEtransferee(false);

        setShowGrad(false);
        setShowBachelor(false);
        setShowDiploma(false);
        setShowHistory(false);
        setShowMission(false);
        setShowVision(false);
        setShowHymn(false);
        setShowAchiever(false);
        setShowIska(false);
        setShowGoodmoral(true);
    
        setShowAvatar(false);

        const hideList = document.querySelectorAll('.list-result');
        hideList.forEach((element) => {
                element.style.display = 'none';
              });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }
        const hideSuggestions = document.querySelectorAll('.suggestions');
          hideSuggestions.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },  
];

// Function for searchInput command
const sendTextToCommands = (text) => {
  const command = commands.find((cmd) => {
    const lowerText = text.toLowerCase();
    const lowerCommand = cmd.command.toString().toLowerCase();
    
    if (typeof cmd.command === 'string' || typeof cmd.command === 'number') {
      return lowerText === lowerCommand;
    } else if (Array.isArray(cmd.command)) {
      return cmd.command.some((phrase) =>
        lowerText.includes(phrase.toString().toLowerCase())
      );
    }
    return false;
  });

  // statement for calling back the command response 
  if (command) {
    command.callback();
  } else {
    displayText('Sorry I currently do not have information about that.');
    const textDisplay = `Sorry I currently do not have information about that.`
    displayOtherText(textDisplay);
    
    setResetButtonVisible(true);
    setAboutResponse(false);
    setAboutVisible(false);
    setDisplayTextOnScreen(false);
    setProgramsButton(false);
    setResponseDisplayed(false);
    setSelectedProgram(false);
    setSelectedYearResponse(false);
    setYearButtonVisible(false);

    setCanteenVisible(false);
    setCanteenResponse(false);

    setAdmissionVisible(false);
    setAdmissionResponse(false);
    
    setYumulVisible(false);
    setYumulResponse(false);

    setLab1Visible(false);
    setLab1Response(false);

    setLab2Visible(false);
    setLab2Response(false);

    setScienceVisible(false);
    setScienceResponse(false);
    
    setEngineerVisible(false);
    setEngineerResponse(false);

    setEducVisible(false);
    setEducResponse(false);

    setGrandStandVisible(false);
    setGrandStandResponse(false);

    setGymVisible(false);
    setGymResponse(false);

    setHMVisible(false);
    setHMResponse(false);
    
    setNantesVisible(false);
    setNantesResponse(false);

    setShowCrVisible(false);
    setShowCrResponse(false);

    setShowEregular(false);
    setShowEfreshmen(false);
    setShowEirregular(false);
    seteShowEtransferee(false);
    setShowAchiever(false);
    setShowBachelor(false);
    setShowDiploma(false);
    setShowGoodmoral(false);

    setShowAvatar(false);


    // Show elements with the textOther classname
    const showTextOther = document.querySelectorAll('.textOther');
    showTextOther.forEach((element) => {
      element.style.display = ''; // Set to an empty string to use the default display value
    });
    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });
    
  }
};
  // Function for the transcript and resetting it and use speechRecognition when commanding or asking
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  // Function for listening to saying
  const startListening = () => {
    SpeechRecognition.startListening();
    setSpeechActive(true);
  };

  // Function for stop commanding
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setSpeechActive(false);
  };

  // Function for handling the textInput 
  const handleTextInputClick = (e) => {
    const targetClassName = e.target.classList;

    // Check if the magnifying glass icon was clicked
    if (targetClassName.contains('faMagnifyingGlass')) {
      setMicrophoneHidden(!microphoneHidden); // Toggle the value of microphoneHidden
    }
  };

  // Displaying in the website
  return (
    <div className="App">
      <header className='header'>
      <div className='left-icons'>
      <Menu/>
      <div className="reset-button">
          {resetButtonVisible && (
            <FontAwesomeIcon onClick={resetDisplay} icon={faHome} size="xl" style={{color: "#ffc800",}}/>
          )}
        </div>
      </div>
      <div className='logo-name'>
    <img src={iska} alt="PUP Logo" className="logo" />
    <div className='app-neym'>
    <h1 className='app-name'>
        IS<span>KA</span></h1>
    </div>
      <p className={responseDisplayed ? 'desc-hidden' : 'desc'}></p>

      </div>
      <div className='right-icon'>

      <FontAwesomeIcon className='questions' icon={isQuestionIcon ? faCircleQuestion : faTimes} size="2xl" style={{color: "#ffc800",}} onClick={toggleQuestions} />
      <FontAwesomeIcon className='virtual' icon={faVideo} size="xl" onClick={toggleVirtualtour} style={{color: "ffc800"}}/>

      {showQuestions && (
        <div className="question-list">
          {/* Add your list of questions here */}
          <h6 className='note'>Here are some task ISKA can do.</h6>
          <p> What are the available programs</p>
          <p> Tell me about PUP</p>
          <p> How to enroll</p>
          <p>- How to become academic achiever</p>
          <p>- How to apply for graduation</p>
          <h5>You can ask ISKA for location of building</h5>
          <p>- Where is the Nantes Building</p>
          <p>- Where is the Admission Office</p>
          {/* Add more questions as needed */}
        </div>
      )}
      </div>
      </header>
      <section>

      <div className='textOther'>
  { commandRecognized && ((otherText))}
  </div>

  <div className='buttons'>
          {yearbutton && (
            <YearButtons onYearButtonClick={handleYearButtonClick} />
                  )}
          {programsButton && (
            <Program onProgramClick={handleProgramButtonClick} />
          ) }
          { aboutButtons && (
            <About onAboutClick={handleAboutButtonClick} />
          )}
        {/* BUILDINGS */}
          {canteenButton && (
            <Canteen onCanteenButtonClick = {handleCanteenButtonClick}/>
          )}
          {scienceButton && (
            <Science onScienceButtonClick = {handleScienceButtonClick} />
          )}
          {engineerButton && (
            <Engineer onEngineerButtonClick = {handleEngineerButtonClick} />
          )}
          {yumulButton && (
            <Yumul onYumulButtonClick = {handleYumulButtonClick} />
          )}
          {nantesButton && (
            <Nantes onNantesButtonClick = {handleNantesButtonClick} />
          )}
          {lab1Button && (
            <Lab1 onLab1ButtonCLick = {handlelab1ButtonClick} />
          )}
          {lab2Button && (
            <Lab2 onLab2ButtonCLick = {handleLab2ButtonClick} />
          )}
          {gymButton && (
            <Gymnasium onGymButtonCLick = {handleGymButtonClick} />
          )}
          {grandstandButton && (
            <Grandstand onGrandstandButtonCLick = {handleGrandstandButtonClick} />
          )}
          {admissionButton && (
            <Admission onAdmissionButtonClick = {handleAdmissionButtonClick} />
          )}
          {educButton && (
            <Education onEducationButtonClick = {handleEducButtonClick} />
          )}
          {hMButton && (
            <Hospitality onHmBUttonClick = {handleHMButtonClick} />
          )}
          {showCrVisible && (
            <ComfortRoom onCrButtonClick = {handleCrButtonClick} />
          )}

        </div>
       
      <div className='vr-box'>
        {showVirtual && (
        <div className='vr'>
        <Vr />
        </div>
      )}
        </div>
      <div className='container'>
     
      {showEregular && <Eregular />}
      {showEirregular && <Eirregular />}
      {showEFreshmen && <Efreshmen />}
      {showEtransferee && <Etransferee />}
      {showGrad && <Graduation />}
      {showBachelor && <Bachelor />}
      {showDiploma && <Diploma />}
      {showHistory && <History />}
      {showMission && <Mission />}
      {showVision && <Vision />}
      {showHymn && <Hymn />}
      {showAchiever && <Achiever />}
      {showIskaDo && <IskaDo />}
      {showGoodMoral && <Goodmoral />}
      {showAvatar && <Avatar />}
      <Avatar />

        <div className="otherResponse">
          <p className="displayResponse">
          {selectedYearResponse}{programsResponse}{aboutResponse}
          {canteenResponse}{scienceResponse}{engineerResponse}{yumulResponse}{admissionResponse}{nantesResponse}{lab1Response}{lab2Response}{educResponse}{HMResponse}{grandstandResponse}{gymResponse}{showCrResponse}
          </p>
        
        <p>{displayTextOnScreen}</p>
      </div>
      

        <div className="recognized-Text">
            {recognizedProcessText && (
              <p className="recognized-text-content">{recognizedProcessText}</p>
            )}
      </div>
      </div>
      </section>

      <div className='suggestions'>
        <button onClick={handleEnrollButtonClick}>
          How to enroll?
        </button>
        <button onClick={handleAboutPUPButtonClick}>
          About PUP
        </button>
        <button onClick={handleAdminButtonClick}>
          Admission Office
        </button>
        <button onClick={handleGrandButtonClick}>
          Grandstand
        </button>

      </div>

      <div className='bottom'>
      <div className='transcript'>
      <p className="transcript-text" autoCorrect="off" spellCheck="true">{transcript}</p>
      </div>
      <div className="microphone">
      <div className="text-input" onClick={handleTextInputClick}>
      <TextInputApp
        onSuggestionClick={handleSuggestionClick}
        onSendText={handleTextInput}
        microphoneHidden={microphoneHidden}
        setMicrophoneHidden={setMicrophoneHidden} // Pass the setMicrophoneHidden function as a prop
     />
    </div>
    <div className='mic'>
    {!microphoneHidden ? (
      speechActive ? (
      <FontAwesomeIcon className='stop' onClick={stopListening} icon={faMicrophone} beat style={{"--fa-primary-color": "#ffae00", "--fa-secondary-color": "#ffffff",}} />
      ) : (
      <FontAwesomeIcon className='start' onClick={startListening} icon={faMicrophone}  style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff",}} />
      )
      ) : null}
    </div>
      
      
      <div className='hide-this'>
      <FontAwesomeIcon
          className="keyBoard"
          icon={faKeyboard}
          size="xl"
          style={{ color: '#ffc800' }}
        />
      </div>
    </div>
      </div>
      
     
    </div>
  );
}



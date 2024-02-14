import React, { useState, useEffect, useRef } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './App.css';

import iska from './pictures/iska-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion, faKeyboard, faPaperPlane, faTimes, faClose, faVrCardboard} from '@fortawesome/free-solid-svg-icons';

// Get and call the Menu.js 
import Menu from './Menu/Menu';

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
import Pillars from './showRespose/About/pillars';
import Philo from './showRespose/About/philo';
import Calendar from './showRespose/About/calendar';

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
import EcoPark from './buildings/ecoPark';

import Vr from './VRtour';

import suggestionsData from './fileJSON/filter.json';

import ErrorComponent from './error';
import speakError from './speakVoice/error.mp3';
import helloIska from './speakVoice/hello.mp3';
import iskaDo from './speakVoice/doISKA.mp3';
import Director from './showRespose/director';
import Founded from './showRespose/About/founded';
import EntranceTest from './showRespose/entranceTest';

import Orgchart from './showRespose/org';

// Function for the searchInput 
function TextInputApp({ onSendText, microphoneHidden, toggleMicrophone, setMicrophoneHidden, onSuggestionClick}) {
  const [showInput, setShowInput] = useState(true);
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState(['']);


  // Handle of showing the searchInput
  const handleShowInput = () => {
    setShowInput(true);
    setMicrophoneHidden(true); // Hide the microphone button when input is shown
    
  };

  useEffect(() => {
    // Show the input by default when the component mounts
    setShowInput(true);
    setMicrophoneHidden(true);
  }, [setMicrophoneHidden, setShowInput]); // Empty dependency array ensures this effect runs only once


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
          <div className='result'>
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
        </div>

          <input id='keyword'
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
      {!showInput && (
        <FontAwesomeIcon
          className="keyBoard"
          onClick={handleShowInput}
          icon={faKeyboard}
          size="xl"
          style={{ color: '#ffc800' }}
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

const [showError, setShowError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

const [showVirtual, setVirtual] = useState(false);

// State for controlling the visibility of the year button
const [yearbutton, setYearButtonVisible] = useState(false);
// State for holding the selected year response
const [selectedYearResponse, setSelectedYearResponse] = useState('');
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
const [recognizedProcessText, setRecognizedProcessText] = useState(' ');
const [isQuestionIcon, setIsQuestionIcon] = useState(true);
const [isVirtualTourOn, setVirtualTourOn] = useState(false);

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

const [showPillars, setShowPillars] = useState(false);
const [showCalendar, setShowCalendar] = useState(false);
const [showPhilo, setShowPhilo] = useState(false);

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
const [showCrResponse, setShowCrResponse] = useState('');

const [showEcoVisible, setShowEcoVisible] = useState(false);
const [showEcoResponse, setShowEcoResponse] = useState('');

const [playAudio, setPlayAudio] = useState(false);
const [currentSpeak, setCurrentSpeak] = useState('');
const audioRef = useRef(null); // Add a reference to the audio element

const [showDirector, setShowDirector] = useState(false);
const [showFounded, setShowFounded] = useState(false);
const [showEntranceTest, setShowEntranceTest] = useState(false);

const [showOrgButton, setShowOrgButton] = useState(false);

useEffect(() => {
  if (playAudio) {
    const audioPlayer = new Audio(currentSpeak);
    audioRef.current = audioPlayer; // Store the reference to the audio element

    audioPlayer.play();

    audioPlayer.addEventListener('ended', () => {
      setPlayAudio(false);
    });
  }
}, [playAudio, currentSpeak]);

const stopAudio = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset the audio to the beginning
  }
};

  const handleSuggestionClick = (suggestion) => {
    // Handle the suggestion click logic in the parent component
    console.log(`Suggestion clicked in parent: ${suggestion}`);
    // Add your logic here
  };

  const handleTextInput = (text) => {
    sendTextToCommands(text);
    const showReset = document.querySelectorAll('.reset-button');
    showReset.forEach((element) => {
      element.style.display = '';
    });
  };

// Function to handle a year button click event
const handleYearButtonClick = (year) => {
  const response = [year];  // Retrieve the response associated with the selected year

    setSelectedYearResponse(response);

  };

  // Function to handle a program button click event
  const handleProgramButtonClick = (programs) => {
    const program = [programs];  // Retrieve the response associated with the selected year

    setSelectedProgram(program);

  };

  // Function to handle a about button click event
  const handleAboutButtonClick = (about) => {
    const abouts = [about];
    setAboutResponse(abouts);

  };

  const handleCanteenButtonClick = (canteen) => {
    const canteenn = [canteen];

    setCanteenResponse(canteenn);
  }

  const handleScienceButtonClick = (science) => {
    const sciencee = [science];

    setScienceResponse(sciencee);
  }

  const handleEngineerButtonClick = (engineer) => {
    const engineerr = [engineer];

    setEngineerResponse(engineerr);
  }

  const handleEducButtonClick = (educ) => {
    const educc = [educ];

    setEducResponse(educc);
  }
  const handleAdmissionButtonClick = (admission) => {
    const admissionn = [admission];

    setAdmissionResponse(admissionn);
  }
  const handleGrandstandButtonClick = (grandstand) => {
    const grandstandd = [grandstand];

    setGrandStandResponse(grandstandd);
  }
  const handleGymButtonClick = (gym) => {
    const gymm = [gym];

    setGymResponse(gymm);
  }
  const handlelab1ButtonClick = (lab1) => {
    const lab1b = [lab1];

    setLab1Response(lab1b);
  }
  const handleLab2ButtonClick = (lab2) => {
    const lab2b = [lab2];

    setLab2Response(lab2b);
  }

  const handleHMButtonClick = (hm) => {
    const hMm = [hm];

    setHMResponse(hMm);
  }

  const handleNantesButtonClick = (nantes) => {
    const nantesh = [nantes];

    setNantesResponse(nantesh);
  }
  const handleYumulButtonClick = (yumul) => {
    const yumull = [yumul];

    setYumulResponse(yumull);
  }
  const handleCrButtonClick = (cr) => {
    const crr = [cr];

    setShowCrResponse(crr);
  }
  const handleEcoButtonClick = (eco) => {
    const ecoo = [eco];

    setShowEcoResponse(ecoo);
  }

const handleEnrollButtonClick = () => {
  setYearButtonVisible(true);
  setResetButtonVisible(true);
  setResponseDisplayed(true);

  window.scroll(0, 0);
    
const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
};

const handleAboutPUPButtonClick = () => {
  setAboutVisible(true);
  setResetButtonVisible(true);
  setResponseDisplayed(true);

  window.scroll(0, 0);

  const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
}

const handleAdminButtonClick = () => {
  setAdmissionVisible (true);
  setResetButtonVisible(true);
  setResponseDisplayed(true);

  window.scroll(0, 0);

  const hideMicAndSearch = document.querySelectorAll('.bottom');
  hideMicAndSearch.forEach((element) => {
    element.style.display = 'none';});
  

  const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
}

const handleGrandButtonClick = () => {
  setGrandStandVisible(true);
  setResetButtonVisible(true);
  setResponseDisplayed(true);

  const hideMicAndSearch = document.querySelectorAll('.bottom');
  hideMicAndSearch.forEach((element) => {
    element.style.display = 'none';});

  const hideAvatar = document.querySelectorAll('.avatar-container');
  hideAvatar.forEach((element) => {
    element.style.display = 'none';
          });

          const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });

  window.scroll(0, 0);
}

  // Function for reset button event
  const resetDisplay = () => {
    setShowError(false);
    stopAudio();
    setDisplayTextOnScreen('');
    setResetButtonVisible(false); // Hide the reset button
    setYearButtonVisible(false);
    setSelectedYearResponse(false);
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

    setShowEcoVisible(false);
    setShowEcoResponse(false);
    setShowDirector(false);
    setShowFounded(false);
    setShowEntranceTest(false);
    setShowOrgButton(false);
    setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

    const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

    const showAvatar = document.querySelectorAll('.avatar-container');
    showAvatar.forEach((element) => {
      element.style.display = '';

      const showSuggestions = document.querySelectorAll('.suggestions');
      showSuggestions.forEach((element) => {
        element.style.display = '';
      });
      const showMicAndSearch = document.querySelectorAll('.bottom');
      showMicAndSearch.forEach((element) => {
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
    setVirtualTourOn(!isVirtualTourOn);
    // Optionally, you can update the state here if needed
    setVirtual(!showVirtual);
      // Toggle the visibility of the element with classname "bottom"
  const bottomElement = document.querySelector('.bottom', 'mic');
  if (bottomElement) {
    bottomElement.style.display = isVirtualTourOn ? '' : 'none';
  }
    
  };
  
  
  // All the command user can ask for ISKA 
  const commands = [
    {
      command: ['* hi','hi *', 'hello', 'hey', '* hello *', '* hello', 'hello *', 'who are you', '* you'],
      callback:() => {
        resetTranscript();
        setCurrentSpeak(helloIska);
        setPlayAudio(true);

        setResetButtonVisible(true);
        setProgramsButton(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);
        
        setResponseDisplayed(false);
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);
        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
      }

    },
    {
      command: ['* enroll *', '* enroll', 'enroll *', 'enroll', 'enrollment', '* enrollment', 'enrollment *', '* enrollment *', 'regular', '* regular', 'irregular', '* irregular', 'freshmen', 'freshman', '* freshmen', '* freshman', 'transferee', '* transferee'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setYearButtonVisible(true);

        setResetButtonVisible(true);

        setDisplayTextOnScreen(false);

        setProgramsButton(false);
        setSelectedProgram(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        
        
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
        
      },
    },

    {
      command: ['* do *', '* do', 'do *', 'do'],
      callback: () => {
        resetTranscript();
        setCurrentSpeak(iskaDo);
        setPlayAudio(true);

        setResetButtonVisible(true);
        setProgramsButton(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        
    const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });

      },
    },
    {
      command: ['About pup', '* about *', '* about', 'about *', '* about pup *', 'about pup *', '* about pup', 'about', 'hymn', '* hymn', 'mission', '* mission', 'vision', '* vision', 'hymn', '* hymn', 'pillars', '* pillars', 'philosophy', '* philosophy', 'history', '* history'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed

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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        
    const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });

        
      },
    },
      
    {
      command: ['* programs', 'programs *', '* program', 'program *', 'program', 'programs', 'course *', '* course ', '* course *', 'course', 'courses', 'courses *', '* courses', '* programs *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setProgramsButton(true);

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
        

    const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
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

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
            const hideMicAndSearch = document.querySelectorAll('.bottom');
    hideMicAndSearch.forEach((element) => {
      element.style.display = 'none';
    });
        
      }
    },

    {
      command: ['* health *', '* health','health','* science ', 'science *', '* science *', 'science', 'two o three', '203', '* 203', '203 *', '204 *', '* 204', '*  205', ' 205 *', '206 *', '* 206', 'chemical lab', '* chemical lab', 'physical lab', '* physical lab', '105 *', '* 105', '106 *', '* 106', '107 *', '* 107', '108 *', '* 108', '204', '205', '206', '105', '106', '107', '108'] || [203, 204, 205, 206, 108, 107, 106, 105],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });
        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['* ict laboratory 3','ict laboratory 3','* 109', '* 110','* 111','* 112','* 113','* 114','* 115','* 116','* 211','* 210','* 209','* 208','* 207','* engineer', 'engineer *', '* engineer *', 'engineer', '* engineering', 'engineering *', '* engineering *', 'engineering', 'architecture', '* architecture', 'architecture *', '* architecture *', '* 207', '* 208' ,'*  209', '* 210', '* 211','* 109','* 110','* 111','* 112','* 113','* 114','* 114','* 116', 'ict lab 3', '* ict lab 3', '* ict lab * 3', 'draft lab', '* draft lab * 3', '* draft lab 3 *', '109', '110', '111', '112', '113', '114', '115', '116', '207', '208', '209', '210', '211'] || [109, 110, 111, 112, 113, 114, 115, 116, 207, 208, 209, 210, 211],
      
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['* yumul', 'yumul *', '* yumul *', 'yumul', '* 200', '* 201', '* 202', '200', '201', '202'] || [200, 201, 202],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      } 
    },
    {
      command: ['* nantes', 'nantes *', '* nantes *', 'nantes', '* dental', 'dental *', 'business', '* business ', '* business *', '* business *' ,'* accounting *', '* 120', 'accounting', 'accounting *', '* accounting', '* accounting *', 'marketing', 'marketing *', '* marketing ', '* marketing*', ' * 121', '121 *', '* 122','122 *', 'medical faculty', 'medical *', '* medical', '* medical *', 'avr', '* avr', 'avr *', '* avr *', 'library', '* library', 'library *', 'speech lab', '* speech lab', '* 216', '216 *', '217 *', ' * 217', '* 218', '218 *', ' * 122', '122 *', '* 121', '121 *', '120 *', ' * 120', '216', '217', '218', '219', '120', '121', '122'] || [216,217,218,120,121,122],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['gymnasium', '* gymnasium', '* gymnasium *', 'gymnasium *', 'gym', '* gym', '* gym *', '* gym *', '*gym*'],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['grandstand', '* grandstand', '* grandstand *', 'grandstand *', 'property office', '* property office', '* property *', '* property', '* rotc', 'rotc *', '* rotc *'],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['education', '* education', 'education *', '* education *', 'educ', '* educ', 'educ *', '* educ *', 'public *', '* public', '* public *', '118','117 *','* 117', '118 *', '* 118', '119 *','* 119', '212 *','* 212', '213 *','* 213', '214 *','* 214', '215 *','* 215', 'csc ', '* csc ', '* csc *', '117', '119', '215', '214', '212', '213'] || [212,213,214,215,117,118,119],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['administration', '* administration','admission', '* admission', 'admission *', '* admission *', 'osas', '* osas', 'osas *', '* osas *', 'cashier', '* cashier', '* cashier *', '* cashier *', 'registrar', '* registrar', ' registrar *', '* registrar *', 'academic ', '* academic', 'academic *', '* academic *', 'director office', '* director office', 'director * office ' ],
      callback: () => {
        resetTranscript();
        
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
        }
    },
    {
      command: ['laboratory 1', 'com lab 1', '* computer laboratory 1 *', 'computer laboratory 1 ', 'ICT lab 1', 'ICT laboratory 1', 'IT lab 1', 'IT laboratory 1', '* 103'] || [103],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
     command:['* 104', 'com lab 2', 'computer lab 2',
       'ICT lab 2', 'ICT laboratory 2', 'IT lab 2', 'IT laboratory 2'] || [104],
        callback: () => {
          resetTranscript();

          setResetButtonVisible(true); // Show the reset button after a command is executed
  
          setProgramsButton(false);
  
          setYearButtonVisible(false);
          setSelectedYearResponse(false);
  
          setDisplayTextOnScreen(false);
  
          setAboutVisible(false);
          setAboutResponse(false);
  
          setSelectedProgram(false);
  
          setResponseDisplayed(true); // Set responseDisplayed to true

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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
       }
    },
    {
      command: ['hospitality', '* hospitality', 'hospitality ', ' hospitality ', 'kitchen lab', ' kitchen lab','kitchen lab ', " kitchen lab ", ' kitchen ','beverage','*beverage','tissue', 'tissue', 'tissue lab', '* tissue lab ', 'plant',' plant ', 'plant',' plant lab *', '* 100', '* 101', '* 102', '100 *', '101 *', '102 *', '100', '101', '102'] || [100,101,102],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
          
      }
      
    },

    {
      command: ['graduation', '* graduation', 'graduation * ', '* graduation *', 'graduated', '* graduated'],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['bachelor', '* bachelor', 'bachelor *', '* bachelor *'],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['diploma', '* diploma', 'diploma *', '* diploma *'],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);


                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowOrgButton(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    
    {
      command: ['* lister', 'dean', '* dean', 'president', '* president', 'achiever', '* achiever', 'lister'],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);
        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
    hideList.forEach((element) => {
            element.style.display = 'none';
          });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['moral', '* moral', 'moral * ', 'good moral', '* good moral', 'good moral *', '* good moral *'],
      callback: () => {
        resetTranscript();;

        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);
        setShowOrgButton(false);

                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);
                  setShowPillars(false);
                  setShowPhilo(false);
                  setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
        hideList.forEach((element) => {
                element.style.display = 'none';
              });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
          hideCloseVR.forEach((element) => {
            element.style.display = 'none';
          });
      }
    },
    {
      command: ['comfort room', '* comfort room', 'comfort room *', '* comfort room *'],
      callback: () => {
        resetTranscript();

        setResetButtonVisible(true);

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
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
        setShowCrVisible(true);
        setShowCrResponse(false);
                  //ECOPARK
                  setShowEcoVisible(false);
                  setShowEcoResponse(false);

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
        setShowDirector(false);
        setShowFounded(false);
        setShowEntranceTest(false);

        setShowOrgButton(false);
        setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

        const hideList = document.querySelectorAll('.list-result');
        hideList.forEach((element) => {
                element.style.display = 'none';
              });

        const hideAvatar = document.querySelectorAll('.avatar-container');
        hideAvatar.forEach((element) => {
          element.style.display = 'none';
        });
        const hideCloseVR = document.querySelectorAll('.suggestions');
        hideCloseVR.forEach((element) => {
          element.style.display = 'none';
        });
          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
      }
      },
      {
        command: ['Eco Park', '* eco park', 'eco park *', '* eco park *'],
        callback: () => {
          resetTranscript();

          setResetButtonVisible(true);
  
          setProgramsButton(false);
  
          setYearButtonVisible(false);
          setSelectedYearResponse(false);
  
          setDisplayTextOnScreen(false);
  
          setAboutVisible(false);
          setAboutResponse(false);
  
          setSelectedProgram(false);
  
          setResponseDisplayed(true); // Set responseDisplayed to true

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
          //ECOPARK
          setShowEcoVisible(true);
          setShowEcoResponse(false);
  
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
          setShowDirector(false);
          setShowFounded(false);
          setShowEntranceTest(false);

          setShowOrgButton(false);
          setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
  
          const hideList = document.querySelectorAll('.list-result');
          hideList.forEach((element) => {
                  element.style.display = 'none';
                });
  
          const hideAvatar = document.querySelectorAll('.avatar-container');
          hideAvatar.forEach((element) => {
            element.style.display = 'none';
          });

          const hideCloseVR = document.querySelectorAll('.suggestions');
            hideCloseVR.forEach((element) => {
              element.style.display = 'none';
            });
        }
        },
  {
  command: ['director', '* director', '* director *'],
  callback: () => {
    resetTranscript();

          setResetButtonVisible(true);
  
          setProgramsButton(false);
  
          setYearButtonVisible(false);
          setSelectedYearResponse(false);
  
          setDisplayTextOnScreen(false);
  
          setAboutVisible(false);
          setAboutResponse(false);
  
          setSelectedProgram(false);
  
          setResponseDisplayed(true); // Set responseDisplayed to true

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
          //ECOPARK
          setShowEcoVisible(false);
          setShowEcoResponse(false);
  
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
          setShowDirector(true);
          setShowFounded(false);
          setShowEntranceTest(false);
          setShowOrgButton(false);
          setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
  
          const hideList = document.querySelectorAll('.list-result');
          hideList.forEach((element) => {
                  element.style.display = 'none';
                });
  
          const hideAvatar = document.querySelectorAll('.avatar-container');
          hideAvatar.forEach((element) => {
            element.style.display = 'none';
          });

          const hideCloseVR = document.querySelectorAll('.suggestions');
            hideCloseVR.forEach((element) => {
              element.style.display = 'none';
            });
        }
  },
  {
    command: ['founded', 'founder'],
    callback: () => {
      resetTranscript();
  
            setResetButtonVisible(true);
    
            setProgramsButton(false);
    
            setYearButtonVisible(false);
            setSelectedYearResponse(false);
    
            setDisplayTextOnScreen(false);
    
            setAboutVisible(false);
            setAboutResponse(false);
    
            setSelectedProgram(false);
    
            setResponseDisplayed(true); // Set responseDisplayed to true
  
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
            //ECOPARK
            setShowEcoVisible(false);
            setShowEcoResponse(false);
    
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
            setShowDirector(false);
            setShowFounded(true);
            setShowEntranceTest(false);

            setShowOrgButton(false);
            setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

            const hideMicAndSearch = document.querySelectorAll('.bottom');
            hideMicAndSearch.forEach((element) => {
              element.style.display = 'none';
            });
    
            const hideList = document.querySelectorAll('.list-result');
            hideList.forEach((element) => {
                    element.style.display = 'none';
                  });
    
            const hideAvatar = document.querySelectorAll('.avatar-container');
            hideAvatar.forEach((element) => {
              element.style.display = 'none';
            });
  
            const hideCloseVR = document.querySelectorAll('.suggestions');
              hideCloseVR.forEach((element) => {
                element.style.display = 'none';
              });
          }
    },
    {
      command: ['Entrance', 'Test', 'Exam', '* entrance', '* entrance *', 'test *', '* test ', '* test *', '* exam ', '* exam *'],
      callback: () => {
        resetTranscript();
    
              setResetButtonVisible(true);
      
              setProgramsButton(false);
      
              setYearButtonVisible(false);
              setSelectedYearResponse(false);
      
              setDisplayTextOnScreen(false);
      
              setAboutVisible(false);
              setAboutResponse(false);
      
              setSelectedProgram(false);
      
              setResponseDisplayed(true); // Set responseDisplayed to true
    
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
              //ECOPARK
              setShowEcoVisible(false);
              setShowEcoResponse(false);
      
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
              setShowDirector(false);
              setShowFounded(false);
              setShowEntranceTest(true);
              setShowOrgButton(false);
              setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);
    
              const hideMicAndSearch = document.querySelectorAll('.bottom');
              hideMicAndSearch.forEach((element) => {
                element.style.display = 'none';
              });
      
              const hideList = document.querySelectorAll('.list-result');
              hideList.forEach((element) => {
                      element.style.display = 'none';
                    });
      
              const hideAvatar = document.querySelectorAll('.avatar-container');
              hideAvatar.forEach((element) => {
                element.style.display = 'none';
              });
    
              const hideCloseVR = document.querySelectorAll('.suggestions');
                hideCloseVR.forEach((element) => {
                  element.style.display = 'none';
                });
            }
      },
      {
        command: ['org', 'organization', '* organization', 'coordinator', '* coordinator', '* department', '* department', 'professor', '* professor'],
        callback: () => {
          resetTranscript();
          setShowOrgButton(true);
          setResetButtonVisible(true);
      
          setProgramsButton(false);
  
          setYearButtonVisible(false);
          setSelectedYearResponse(false);
  
          setDisplayTextOnScreen(false);
  
          setAboutVisible(false);
          setAboutResponse(false);
  
          setSelectedProgram(false);
  
          setResponseDisplayed(false); // Set responseDisplayed to true

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
          //ECOPARK
          setShowEcoVisible(false);
          setShowEcoResponse(false);
  
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
          setShowDirector(false);
          setShowFounded(false);
          setShowEntranceTest(false);
          setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);

          const hideMicAndSearch = document.querySelectorAll('.bottom');
          hideMicAndSearch.forEach((element) => {
            element.style.display = 'none';
          });
  
          const hideList = document.querySelectorAll('.list-result');
          hideList.forEach((element) => {
                  element.style.display = 'none';
                });
  
          const hideAvatar = document.querySelectorAll('.avatar-container');
          hideAvatar.forEach((element) => {
            element.style.display = 'none';
          });

          const hideCloseVR = document.querySelectorAll('.suggestions');
            hideCloseVR.forEach((element) => {
              element.style.display = 'none';

        });
      }
    },
    
];

  // Function to handle incorrect command
  const handleIncorrectCommand = () => {
    // Set the error message and show the error component
    setErrorMessage("Sorry, I currently don't have information about that.");
    setShowError(true);
  };

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
    setCurrentSpeak(speakError);
    setPlayAudio(true);

    handleIncorrectCommand();

    setResetButtonVisible(false);
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
    setShowDirector(false);
    setShowFounded(false);
    setShowEntranceTest(false);
    setShowOrgButton(false);
    setShowPillars(false);
        setShowPhilo(false);
        setShowCalendar(false);


    setShowAvatar(false);

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
    setSpeechActive(true);

    const language = 'English-US';

    SpeechRecognition.startListening({ language });

     // Set a timer for, let's say, 5 seconds (5000 milliseconds)
  const timerDuration = 5000;

  // After the specified time, stop listening
  setTimeout(() => {
    SpeechRecognition.stopListening();
    setSpeechActive(false);
  }, timerDuration);
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
    <img src={iska} alt="PUP Logo"/>
    <p>
    IS<span>KA</span>
    </p>
    </div>
      <p className={responseDisplayed ? 'desc-hidden' : 'desc'}></p>

      <div className='right-icon'>

      <FontAwesomeIcon className='questions' icon={isQuestionIcon ? faCircleQuestion : faTimes} size="2xl" style={{color: "#ffc800",}} onClick={toggleQuestions} />
      <FontAwesomeIcon className='virtual' icon={isVirtualTourOn ? faClose : faVrCardboard} size="xl" onClick={toggleVirtualtour}  style={{ color: isVirtualTourOn ? '#ffc800' : '#ffc800' }}/>

      {showQuestions && (
        <div className="question-list">
          {/* Add your list of questions here */}
          <h5>Here are some task ISKA can do.</h5>
          <p>-  How to enroll?</p>
          <p>- How to apply academic achiever</p>
          <p>- How to get a Good Moral</p>
          <p>- How to apply for graduation</p>
          <p>- PUP Mission and Vision</p>
          <p>- PUP Philosophy</p>
          <p>- PUP 10 Pillars</p>
          <p>- What are the available programs</p>
          <p>- Who is the Campus director of PUP Lopez?</p>
          <p>- Who is the Coordinator of the BSIT Course?</p>
          <p>- Tell me about PUP</p>

          <h5>You can ask ISKA for location of the building</h5>
          <p>- Where is the Administration Office?</p>
          <p>- Where is the Grandstand?</p>
          <p>- Where is the Library?</p>
          <p>- Where is the Clinic?</p>
          <p>- Where is ICT laboratory 1?</p>
          <p>- Where is the Academic Office?</p>
          <p>- Where is the CSC Office?</p>
          {/* Add more questions as needed */}
        </div>
      )}
      </div>
      </header>

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
          {showEcoVisible && (
            <EcoPark onEcoButtonClick = {handleEcoButtonClick} />
          )}
          

        </div>
       
      <div className='vr-box'>
        {showVirtual && (
        <div className='vr'>
        <Vr />
        </div>
      )}
        </div>
    <div className='error'>
      {showError && <ErrorComponent errorMessage={errorMessage} onTryAgain={resetDisplay} />}
    </div>
      <div className='container'>
     <div className='container-content'>

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
      {showDirector && <Director/>}
      {showFounded && <Founded/>}
      {showEntranceTest && <EntranceTest/>}
      {showOrgButton && <Orgchart />}
      {showPillars && <Pillars />}
      {showPhilo && <Philo />}
      {showCalendar && <Calendar />}
      <Avatar />

        <div className="recognized-Text">
            {recognizedProcessText && (
              <p className="recognized-text-content">{recognizedProcessText}</p>
            )}
      </div>
      <div className="otherResponse">
          <p className="displayResponse">
          {selectedYearResponse}{programsResponse}{aboutResponse}

          {showEcoResponse}{canteenResponse}{scienceResponse}{engineerResponse}{yumulResponse}{admissionResponse}{nantesResponse}{lab1Response}{lab2Response}{educResponse}{HMResponse}{grandstandResponse}{gymResponse}{showCrResponse}
          </p>
        
        <p>{displayTextOnScreen}</p>
      </div>
      </div>

      </div>

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
            <div className='hide-this'>
      <FontAwesomeIcon
          className="keyBoard"
          icon={faKeyboard}
          size="xl"
          style={{ color: '#ffc800' }}
        />
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



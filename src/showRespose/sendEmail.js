import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './showResponse.css';

export const FeedBackForm = ({ onClose }) => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const sendEmailFeedback = (e) => {
    e.preventDefault();

    // Validate email before sending
    const isValidEmail = validateEmail(form.current.user_email.value);

    if (!isValidEmail) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    emailjs
      .sendForm('service_p3j6cuv', 'template_cu6s7dp', form.current, {
        publicKey: 'Pol7gLnFKB3inWaU1',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setIsSent(true);
          // Clear the form
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const validateEmail = (email) => {
    // Simple email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = () => {
    // Clear email error when user types
    setEmailError('');
  };

  return (
    <div className='feedback-form'>
      <div className='close-button' onClick={onClose}>
        Close
      </div>
      <h2>Give us your feedback</h2>
      <div className='form-content'>
        <form ref={form} onSubmit={sendEmailFeedback}>
          <div className='form-input'>
            <label>Name</label>
            <input type="text" name="user_name" />
          </div>
          <div className='form-input'>
            <label>Email</label>
            <input type="email" name="user_email" onChange={handleEmailChange} required />
            {emailError && <div className='error-message'>{emailError}</div>}
          </div>
          <div className='form-input'>
            <label>Message</label>
            <textarea name="message" />
          </div>
          <div className='submit-form'>
            <input type="submit" value="Send" disabled={isSent} />
          </div>
        </form>
      </div>
      {isSent && <div className='success-message'>Send successfully!</div>}
    </div>
  );
};

export default FeedBackForm;

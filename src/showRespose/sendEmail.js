import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './showResponse.css';

export const FeedBackForm = ({ onClose }) => {
  const form = useRef();

  const sendEmailFeedback = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_p3j6cuv', 'template_cu6s7dp', form.current, {
        publicKey: 'Pol7gLnFKB3inWaU1',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
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
      <input type="email" name="user_email" />
      </div>
      <div className='form-input'>
      <label>Message</label>
      <textarea name="message" />
      </div>
      <div className='submit-form'>
      <input type="submit" value="Send" />
      </div>
    </form>
    </div>
    </div>

  );
};
export default FeedBackForm;
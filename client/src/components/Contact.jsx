import React, { useState, useRef } from 'react';
import { RiMessage3Fill } from 'react-icons/ri';
import Header from './Header';
import { motion } from 'framer-motion';
import emailjs from "@emailjs/browser";
import AlertSuccess from './AlertSuccess';
import AlertError from './AlertError';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_nqld9ll', 'template_6n2pwa8', form.current, 'bAHlVS3J1DbsbMyUj')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);
    e.target.reset()
  };


  const handleTextareaChange = (e) => {
    if (e.target.value.length <= 500) {
      setMessage(e.target.value);
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;

    if (isFormSubmitted) {
      if (inputEmail.length > 20) {
        setTimeout(() => setShowSuccessAlert(false), 5000);
        setShowErrorAlert(true);
        return;
      }

      if (!inputEmail.includes('@')) {
        setTimeout(() => setShowSuccessAlert(false), 5000);
        setShowErrorAlert(true);
        return;
      }

      const isValid = /^[a-zA-Z0-9_@.]+$/.test(inputEmail);
      if (!isValid) {
        setTimeout(() => setShowSuccessAlert(false), 5000);
        setShowErrorAlert(true);
        return;
      }
    }

    setEmail(inputEmail);
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;

    if (inputName.length <= 20) {
      setName(inputName);
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-between text-textDashboardCard bg-bg_color">
      <Header />
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="max-w-screen-xl w-full p-20 bg-primary rounded-xl shadow-md border-2 border-textDashboardCard">
          <h2 className="flex items-center justify-center text-2xl font-semibold mb-4 text-textDashboardCard">
            Зворотній зв'язок <RiMessage3Fill className='text-textDashboardCard ml-2' size={ 30 } />
          </h2>
          { showSuccessAlert && <AlertSuccess msg="Email sent successfully!" /> }
          { showErrorAlert && <AlertError msg="Error sending email." /> }
          <form ref={ form }
            onSubmit={ sendEmail }
            className="max-w-screen-md mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-textDashboardCard">
                Ваше ім'я
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Введіть ваше ім'я"
                className="mt-1 p-2 w-full border rounded-md bg-isActiveColor bg-opacity-20 border-black"
                value={ name }
                onChange={ handleNameChange }
                maxLength={ 20 }
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-textDashboardCard">
                Ваш email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Введіть ваш email"
                className="mt-1 p-2 w-full border rounded-md bg-isActiveColor bg-opacity-20 border-black"
                value={ email }
                maxLength={ 40 }
                onChange={ handleEmailChange }
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-textDashboardCard">
                Повідомлення
              </label>
              <textarea
                type="text"
                id="message"
                name="message"
                placeholder="Введіть ваше повідомлення (макс. 500 символів)"
                rows="4"
                value={ message }
                onChange={ handleTextareaChange }
                className="mt-1 p-2 w-full border text-textDashboardCard bg-isActiveColor bg-opacity-20 rounded-md resize-none border-black"
                maxLength={ 500 }
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              initial={ { opacity: 0 } }
              animate={ { opacity: 1 } }
              whileTap={ { scale: 0.75 } }
              className="w-150 py-3 px-2 mx-auto block bg-resultSearching text-white rounded-md hover:bg-black text-center"
            >
              Відправити
            </motion.button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import {useState} from 'react'

export default function PasswordValidation() {
    const [validationMessage, setValidationMessage] = useState('');

    const validatePassword = (password) => { 
      const lowerCase = /[a-z]/;
      const upperCase = /[A-Z]/;
      const number = /[0-9]/;
      const minLength = /.{6,}/;
  
      if (!lowerCase.test(password) || !upperCase.test(password) || !number.test(password) || !minLength.test(password) ) {
        setValidationMessage('Password must contain at least one lowercase, uppercase, number and 6 characters long.');
        return false;
      }

      setValidationMessage('');
      return true;
    };

  
    return { validatePassword, validationMessage };
  }


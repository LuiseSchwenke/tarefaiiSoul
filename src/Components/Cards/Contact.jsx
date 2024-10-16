import React, { useState } from 'react';
// import $ from 'jquery';
import 'jquery-mask-plugin';
import InputMask from 'react-input-mask';

const Contact = ({
  data = {},
  onFormDataChange,
  errorMessageMail,
  errorMessagePhone,
  patternMail,
  patternPhone,
}) => {
  const [mailFocused, setMailFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleFocused = (e) => {
    if (e.target.name === 'mail') {
      setMailFocused(true);
    } else if (e.target.name === 'phone') {
      setPhoneFocused(true);
    }
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    onFormDataChange({ phone: phone });

    if (!phone.match(patternPhone)) {
      setPhoneError(errorMessagePhone);
    } else {
      setPhoneError('');
    }
  };

  const handleMailChange = (event) => {
    const email = event.target.value;
    onFormDataChange({ mail: email });

    if (!email.match(patternMail)) {
      setEmailError(errorMessageMail);
    } else {
      setEmailError('');
    }
  };

  /* useEffect(() => {
    $('#phone').mask('(00) 00000-0000');
  }, []);
 */ 
  return (
    <div>
      <form>
        <div className="input-control">
          <label htmlFor="mail" className="form-label">E-Mail</label>
          <input
            className="form-control"
            type="email"
            id="mail"
            value={data.mail}
            name="mail"
            onChange={handleMailChange}
            placeholder="Seu E-Mail"
            required
            pattern={patternMail}
            onBlur={handleFocused}
            focused={mailFocused.toString()}
          />
          <span className='error-span'>{emailError || errorMessageMail}</span>
        </div>

        <div className="input-control">
          <label htmlFor="phone" className="form-label">Número de Celular (com +DD)</label>
          <InputMask
            className="form-control"
            type="text"
            id="phone"
            value={data.phone}
            name="phone"
            mask="(99) 9999-9999"
            onChange={handlePhoneChange}
            placeholder="(00) 0000-0000"
            required
            // pattern={patternPhone}
            onBlur={handleFocused}
            focused={phoneFocused.toString()}
          />
          <span className='error-span'>{phoneError || errorMessagePhone}</span>
        </div>
      </form>
    </div>
  );
};

export default Contact;

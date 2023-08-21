import { nanoid } from 'nanoid';
import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContactForm = () => {
  const [contactName, setContactName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmitContact = e => {
    e.preventDefault();


    const isInContacts = contacts.find(
      ({ name }) => name.toLowerCase() === contactName.toLowerCase()
    );

    if (isInContacts) {
      return toast.warn(`${contactName} is already in your contacts`);
    }
    const newContact = {
      id: nanoid(),
      name: contactName,
      number,
    };
    const reset = () => {
      setContactName('');
      setNumber('');
    };

    dispatch(addContact(newContact));
    reset();
  };

  const handleChange = e => {
    const { value, name } = e.target;

    switch (name) {
      case 'name':
        setContactName(value.trim());
        break;

      case 'number':
        setNumber(value.trim());
        break;

      default:
        return;
    }
  };

  return (
    <form className={css.formBox} onSubmit={handleSubmitContact}>
      <div className={css.formInputBox}>
        <label className={css.formInputTxt}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={contactName}
          />
        </label>
      </div>

      <div className={css.formInputBox}>
        {' '}
        <label className={css.formInputTxt}>
          Number
          <input
            className={css.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
          />
        </label>{' '}
      </div>
      <button className={css.addBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

import css from './ContactList.module.css'
import { RiDeleteBinLine } from 'react-icons/ri';
import { getContacts, getFilter } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export const ContactList = () => {

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filteredContacts?.length) {
    return <p>No contacts added yet.</p>;
  }


  return (
    <ul className={css.contactList}>
       { filteredContacts.map(({id, name, number}) => {
          return (
            <li className={css.contactListItem} key={id}>
      <span className={css.contactItem} >{name} : {number}</span>
    
      <button
      className={css.deleteBtn}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        <RiDeleteBinLine/>
      </button>
    </li>
          );
        })}
    </ul>
  );
}


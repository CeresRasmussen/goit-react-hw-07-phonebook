import { useDispatch, useSelector } from 'react-redux';

import { deleteContactThunk } from 'redux/operation';
import { getFilter } from 'redux/sliceFilter';
import { getContacts } from 'redux/contactSlice';
import { openModal } from 'redux/contactSlice';
import { EditModal } from 'components/EditModal/EditModal';

import { isShowModal } from 'redux/contactSlice';
import css from 'components/Contacts/Contacts.module.css';
import React from 'react';
import { Notification } from 'components/Notification/Notification';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contacts = ({ children }) => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContactsFunc = () => {
    const list = contactsList.filter(contact => {
      const contactWords = contact.name.toLowerCase().split(' ');
      return contactWords.some(word => word.startsWith(filter.toLowerCase()));
    });
    return list;
  };
  const filteredContacts = filteredContactsFunc();

  const contactName = id => {
    const index = filteredContacts.findIndex(contact => contact.id === id);
    const nameContact = filteredContacts[index].name;
    return nameContact;
  };

  const deleteContactsFunc = contactId => {
    dispatch(deleteContactThunk(contactId));

    toast.info(`${contactName(contactId)} was deleted!`);
  };

  const isOpen = useSelector(isShowModal);

  return (
    <>
      <section>
        <h2 className={css.title}>Contacts</h2>
        {children}
        {filteredContacts.length > 0 ? (
          <ul>
            {filteredContacts.map(({ id, name, number }) => (
              <li key={id} className={css.item}>
                <span className={css.span}>{name} </span>
                <span className={css.span}>{number}</span>
                <button
                  type="button"
                  className={css.edit}
                  title="Edit"
                  onClick={() => {
                    dispatch(openModal({ id, name, number }));
                    console.log('isOpen:', isOpen);
                  }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    wwidth="16"
                    height="16"
                    fill="currentColor"
                    className={css.icon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className={css.close}
                  title="Delete"
                  onClick={() => deleteContactsFunc(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={css.icon}
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Notification message="There is no contact"></Notification>
        )}
      </section>
      {isOpen && <EditModal></EditModal>}
    </>
  );
};

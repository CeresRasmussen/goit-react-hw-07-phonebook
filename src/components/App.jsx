import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/contactSlice';
import { setFilter, getFilter } from 'redux/sliceFilter';

import { InputForm } from 'components/InputForm/InputForm';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from '@reduxjs/toolkit';

import {
  fetchContactsThunk,
  addContactThunk,
  deleteContactThunk,
} from 'redux/operation';

export const App = () => {
  const contactsList = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const onSubmitForm = newContact => {
    if (
      contactsList.some(contact => {
        return contact.name === newContact.name;
      })
    ) {
      toast.error(`${newContact.name} is alredy in Phonebook `);
      return;
    }
    newContact.id = nanoid(5);
    dispatch(addContactThunk(newContact));
  };

  const onFilterContacts = query => {
    dispatch(setFilter(query.target.value));
  };

  const filteredContactsFunc = () => {
    const list = contactsList.filter(contact => {
      const contactWords = contact.name.toLowerCase().split(' ');
      return contactWords.some(word => word.startsWith(filter.toLowerCase()));
    });
    return list;
  };

  const deleteContactsFunc = contactId => {
    dispatch(deleteContactThunk(contactId));
  };

  const filteredContacts = filteredContactsFunc();

  return (
    <div
      style={{
        display: 'flex',
        width: '460px',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'center',
        backgroundColor: '#212121',
        color: '#010101',
        gap: '30px',
        // border: '1px solid black',
        // borderRadius: '4px',
      }}
    >
      <InputForm onSubmitForm={onSubmitForm}></InputForm>
      <Contacts contacts={filteredContacts} deleteContacts={deleteContactsFunc}>
        <Filter onFilterContacts={onFilterContacts} value={filter}></Filter>
      </Contacts>
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { InputForm } from 'components/InputForm/InputForm';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchContactsThunk } from 'redux/operation';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

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
      }}
    >
      <InputForm></InputForm>
      <Contacts>
        <Filter></Filter>
      </Contacts>
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};

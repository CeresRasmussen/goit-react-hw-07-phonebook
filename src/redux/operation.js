import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContactsById, fetchContacts } from 'api/api';

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchContacts',
  async (contacts, thunkApi) => {
    try {
      const { data } = await fetchContacts(contacts);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'tours/AddContact',
  async (contact, thunkApi) => {
    try {
      const { data } = await addContact(contact);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'tours/DeleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await deleteContactsById(contactId);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

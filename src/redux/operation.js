import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContactsById,
  fetchContacts,
  editContactsById,
} from 'api/api';

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
  'contacts/AddContact',
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
  'contacts/DeleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await deleteContactsById(contactId);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const editContactThunk = createAsyncThunk(
  'contacts/EditContact',
  async (contact, thunkApi) => {
    try {
      console.log('contact:', contact);
      const { data } = await editContactsById(contact);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

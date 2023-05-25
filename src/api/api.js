import axios from 'axios';
const BASE_URL = 'https://646a3ced03bb12ac209d93c1.mockapi.io/contacts/';
const HTTPClient = axios.create({
  baseURL: BASE_URL,
});

const fetchContacts = (query = false) => {
  const requestURL = query ? `/contacts/${query}` : '/contacts';
  const request = HTTPClient.get(requestURL);
  return request;
};

const addContact = contact => {
  return HTTPClient.post('/contacts', contact);
};

const deleteContactsById = contactId => {
  return HTTPClient.delete(`/contacts/${contactId}`).catch(e => console.log(e));
};
const editContactsById = ({ id, name, number }) => {
  return HTTPClient.put(`/contacts/${id}`, { id, name, number }).catch(e =>
    console.log(e)
  );
};
export { fetchContacts, addContact, deleteContactsById, editContactsById };

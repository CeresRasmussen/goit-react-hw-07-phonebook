import css from 'components/InputForm/InputForm.module.css';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const initialValue = { name: '', number: '' };
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-ЯіІєЄїЇ]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ])?[a-zA-Zа-яА-ЯіІєЄїЇ]*)*$/,
      {
        message:
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      }
    )
    .required(
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      {
        message:
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
      }
    )
    .required(
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

export const InputForm = ({ onSubmitForm }) => {
  // console.log('InputForm:');
  const loginInputId = nanoid(5);
  const handleSubmit = (newContact, { resetForm }) => {
    onSubmitForm(newContact);
    resetForm();
  };

  return (
    <section>
      <h2 className={css.title}>Phonebook</h2>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css['input-form']}>
          <label htmlFor={loginInputId} className={css['sub-title']}>
            Name
            <Field
              id={loginInputId}
              type="text"
              name="name"
              placeholder="Enter the contact's name..."
            />
            <ErrorMessage name="name" component="div" />
          </label>

          <label htmlFor={loginInputId} className={css['sub-title']}>
            Number
            <Field
              type="tel"
              name="number"
              placeholder="Enter the contact's number..."
            />
            <ErrorMessage name="number" component="div" />
          </label>
          <button type="submit" className={css['continue-application']}>
            <div>
              <div className={css.pencil}></div>
              <div className={css.folder}>
                <div className={css.top}>
                  <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                  </svg>
                </div>
                <div className={css.paper}></div>
              </div>
            </div>
            Add contact
          </button>
        </Form>
      </Formik>
    </section>
  );
};

InputForm.propTypes = {
  onSubmitForm: PropTypes.func,
};

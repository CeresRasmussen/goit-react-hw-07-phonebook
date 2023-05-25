import css from 'components/EditModal/EditModal.module.css';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEditedContact } from 'redux/contactSlice';
import { closeModal } from 'redux/contactSlice';
import { Formik, Form, Field } from 'formik';
import { editContactThunk } from 'redux/operation';
const modalRoot = document.querySelector('#modal-root');

export const EditModal = () => {
  const dispatch = useDispatch();
  const { name, number, id } = useSelector(getEditedContact);

  const initialValue = { name, number };

  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        dispatch(closeModal());
      }
    };
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [dispatch]);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      dispatch(closeModal());
    }
  };

  const handleSubmit = editedContact => {
    console.log('editedContact:', editedContact);
    editedContact.id = id;
    dispatch(editContactThunk(editedContact));
    // toast.success(`${newContact.name} was added!`);
    dispatch(closeModal());
  };

  return createPortal(
    <div className={css.Overlay} onClick={onBackdropClick}>
      <div className={css.Modal}>
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <p className={css['form-title']}>Sign in to your account</p>
            <div className={css['input-container']}>
              <label htmlFor="name" className={css.label}>
                Name
                <Field type="text" name="name" placeholder="Enter email" />
              </label>
            </div>
            <div className={css['input-container']}>
              <label htmlFor="number" className={css.label}>
                Number
                <Field type="tel" name="number" placeholder="Enter password" />
              </label>
            </div>
            <button type="submit" className={css.submit}>
              Change
            </button>
            <button
              type="button"
              name="close"
              onClick={() => dispatch(closeModal())}
            >
              Close
            </button>
          </Form>
        </Formik>
      </div>
    </div>,
    modalRoot
  );
};

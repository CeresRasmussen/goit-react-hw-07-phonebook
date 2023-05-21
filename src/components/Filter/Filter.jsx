import { setFilter, getFilter } from 'redux/sliceFilter';
import { useDispatch, useSelector } from 'react-redux';
import css from 'components/Filter/Filter.module.css';

import React from 'react';
import PropTypes from 'prop-types';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onFilterContacts = query => {
    dispatch(setFilter(query.target.value));
  };

  return (
    <>
      <label className={css.title}>
        Find contact by name
        <input
          type="text"
          value={filter}
          name="filter"
          onChange={onFilterContacts}
          placeholder="Enter the filter value..."
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onFilterContacts: PropTypes.func,
};

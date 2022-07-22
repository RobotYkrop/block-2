import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const Search = ({ searchChange }) => {
  const onSearch = (e) => {
    const MovieRequest = e.target.value.replace(/^[ \t]+$/gm, '');
    localStorage.setItem('search', JSON.stringify(MovieRequest));
    searchChange(MovieRequest);
  };
  return (
    <Input
      placeholder="Type to search..."
      size="large"
      onChange={debounce(onSearch, 1000)}
      defaultValue={JSON.parse(localStorage.getItem('search'))}
    />
  );
};

Search.propTypes = {
  searchChange: PropTypes.func,
};

export default Search;

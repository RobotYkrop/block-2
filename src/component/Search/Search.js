import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import './Search.css';

const Search = ({ searchChange }) => {
  const onSearch = (e) => {
    const trimUserRequest = e.target.value;
    searchChange(trimUserRequest);
  };

  return <Input placeholder="Type to search..." size="large" onChange={debounce(onSearch, 1000)} />;
};

Search.defaultProps = {
  searchChange: () => {},
};

Search.propTypes = {
  searchQueryChange: PropTypes.func,
};

export default Search;

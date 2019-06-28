import React from 'react';
import PropTypes from 'prop-types';

const ApptsListFilter = props => {

  const array = [
    {
      id: 'all',
      rep: 'ВСЕ'
    },
    {
      id: 'active',
      rep: 'запланированные',
    },
    {
      id: 'past',
      rep: 'прошедшие',
    }
  ]

  return (
    <div>
      {array.map(item => {
        return props.renderButtons(item.id, item.rep)
      })}
    </div>
  );
};

ApptsListFilter.propTypes = {
  filterId: PropTypes.string.isRequired,
};

export default ApptsListFilter;
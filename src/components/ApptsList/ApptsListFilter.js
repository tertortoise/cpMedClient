import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridItem: {

  },
}));

const ApptsListFilter = props => {
  const classes = useStyles();
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

  return array.map(item => {
        return props.renderButtons(item.id, item.rep)
      })}

ApptsListFilter.propTypes = {
  filterId: PropTypes.string.isRequired,
};

function areEqual(prevProps, nextProps) {
  if (prevProps.filterId === nextProps.filterId) return true;
  else return false;
}

export default React.memo(ApptsListFilter, areEqual);
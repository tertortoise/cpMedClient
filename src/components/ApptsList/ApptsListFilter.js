import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
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

  return (
    <Grid container spacing={1} className={classes.root}>
      {array.map(item => {
        return (<Grid key={item.id} item>{props.renderButtons(item.id, item.rep)}</Grid>) 
      })}
    </Grid>
  );
};

ApptsListFilter.propTypes = {
  filterId: PropTypes.string.isRequired,
};

export default ApptsListFilter;
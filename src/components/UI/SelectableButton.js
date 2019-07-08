import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: props =>
      props.selected
        ? theme.palette.primary.light
        : null,
    color: props =>
    props.selected
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
   
  },
}));

function SelectableButton(props) {
  const { selected, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

export default SelectableButton;

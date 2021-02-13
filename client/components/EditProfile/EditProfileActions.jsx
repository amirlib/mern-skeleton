import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { AuthContext } from '../../contexts/auth.context';

const useStyles = makeStyles((theme) => ({
  list: {
    margin: 'auto',
    marginTop: theme.spacing(5),
    maxWidth: 400,
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

const EditProfileActions = (props) => {
  const { onSave } = props;
  const { logoutAll } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const handleLogoutAllClick = async () => {
    await logoutAll();

    return history.push('/');
  };

  return (
    <List
      className={classes.list}
      component="nav"
    >
      <Divider />

      <ListItem
        button
        onClick={handleLogoutAllClick}
      >
        <ListItemIcon />
        <ListItemText primary="Logout from all devices" />
      </ListItem>

      <Divider />

      <ListItem
        button
        onClick={onSave}
      >
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>

        <ListItemText primary="Save Changes" />
      </ListItem>

      <Divider />
    </List>
  );
};

EditProfileActions.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default EditProfileActions;

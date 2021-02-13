import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteProfile from './DeleteProfile';
import { AuthContext } from '../../contexts/auth.context';

const ProfileActions = () => {
  const { user } = useContext(AuthContext);

  return (
    <ListItemSecondaryAction>
      <Link to={`/user/edit/${user._id}`}>
        <IconButton
          aria-label="Edit"
          color="primary"
        >
          <Edit />
        </IconButton>
      </Link>

      <DeleteProfile userId={user._id} />
    </ListItemSecondaryAction>
  );
};

export default ProfileActions;
